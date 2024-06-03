import * as path from "path";
import * as fs from "fs/promises";
import {v4 as uuidv4} from 'uuid';

import {isNumber, isString} from '../helpers/helper.js';

// Getting all data
export const getAllData = async (req, res) => {
  try {
    const dbPath = path.join('db', 'db.json');
    const data = JSON.parse(await fs.readFile(dbPath, {encoding: 'utf-8'})) || [];
    console.log(data)
    if (!data) {
      return res.status(404).json({
        ok: false,
        message: "No such database"
      })
    }
    res.status(200).json({
      ok: true,
      data:data
    })
  } catch (e) {
    console.log("Getting all data", e);
    return res.status(500).json({
      ok: false,
      error: e
    })
  }
}

// To create data
export const createLocationData = async (req, res) => {
  try {
    const { lat, long } = req.body;
    const uploadedFiles = req.files;

    if (!uploadedFiles || !uploadedFiles.length) {
      return res.status(400).send({
        ok: false,
        message: "Attached file doesn't match the image"
      });
    }

    const fileUrls = uploadedFiles.map(file => ({
      url: `images/${file.filename}`
    }));

    const dbPath = path.join('db', 'db.json');
    const rawData = await fs.readFile(dbPath, { encoding: 'utf-8' });
    const locationData = JSON.parse(rawData) || [];

    const existingLocation = locationData.filter(loc =>
        loc.location[0] === lat && loc.location[1] === long
    );

    if (existingLocation.length) {
      existingLocation[0].images.push(...fileUrls);

      await fs.writeFile(dbPath, JSON.stringify(existingLocation, null, 2));

      return res.status(200).json({
        ok: true,
        message: "Images updated successfully.",
      });
    }

    locationData.push({
      id: uuidv4(),
      location: [lat, long],
      images: fileUrls,
      date: new Date().toString()
    });

    await fs.writeFile(dbPath, JSON.stringify(locationData, null, 2));

    return res.status(200).send({
      ok: true,
      message: "Location data created successfully"
    });
  } catch (error) {
    console.log('CreateLocationData error', error);
    return res.status(500).send({
      ok: false,
      message: "An error occurred while creating location data"
    });
  }
};


// To get  data
export const getLocationData = async (req, res) => {
  try {
    const {lat, long} = req.body;

    const data = JSON.parse(await fs.readFile(path.join('db', 'db.json'), {encoding: 'utf-8'}));

    const findData = data.find((d) => +d.location[0] === lat && +d.location[1] === long);

    if (!findData) {
      return res.status(404).send({
        ok: false,
        message: 'Location does not exist'
      })
    }
    return res.status(200).json({
      ok: true,
      data: findData
    });
  } catch (e) {
    console.log('Getting location data', e);
  }
};
