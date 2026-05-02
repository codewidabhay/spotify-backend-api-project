const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");

async function createMusic(req, res){    
    const {title} = req.body;
    const file = req.file;

    if(!file){
        return res.status(403).json({message: "File is needed"})
        
    }

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message: "Music Uploaded Successfully",
        music:{
            id: music.id,
            uri: music.url,
            title: music.title,
            artist: music.artist,
        }
    })

}

async function createAlbum(req, res){

    const {title, musics} = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })

    res.status(201).json({
        message:"Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })
            
        
} 

async function  getAllMusic(req, res){
    const musics = await musicModel.find()

    res.status(201).json({
        message: "Music Fetched Successfully",
        musics: musics
    })
}


module.exports = { createMusic, createAlbum, getAllMusic}