const Photo = require("../models/photo");
const { generateToken } = require("../lib/token");
const fs = require('fs');
const path = require('path');


async function upload(req, res) {
    console.log(req.file)
    const photoName = req.file.filename;
    const photoPath = req.file.path;
    // const photoPath = "I broke your code";
    const dateNow = Date.now() 
    const user_id = req.user_id
  
    try {
      await Photo.create({photoFileName: photoName, photoFilePath: photoPath, photoFileDate: dateNow, user_id: user_id})
      res.json({status:"ok"})
    } catch (error) {
      res.json({status:"error"})
    }

  }


async function get(req, res) {
  try {
    const photo = await Photo.find({ user_id: req.user_id })
    const newToken = generateToken(req.user_id);
    // const photoPath = path.join(__dirname, photos[0].photoFilePath);
    // console.log(photoPath)
    // fs.readFile(photoPath, (err, data) => {
    //     if (err) {
    //       console.error("Error reading photo:", err);
    //       return res.status(500).json({ message: "Error reading photo" });
    //     }
      
    //     res.setHeader('Content-Type', 'image/png');
    //     res.status(200).send(data);
    //   });
    res.status(200).json({ filePath: photo[0].photoFilePath, token: newToken })

  } catch (error) {
    res.status(400);
}

}


const photoController = {
    upload: upload,
    get: get
  };

module.exports = photoController;