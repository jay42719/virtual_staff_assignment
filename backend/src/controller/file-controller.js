'use strict';

const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const File = require('../models/file-model');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const ffprobeStatic = require('ffprobe-static');
ffmpeg.setFfprobePath(ffprobeStatic.path);


exports.list = async (req, res) => {
    try {
        const files = await File.find({});
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch files'
        });
    }
};

exports.upload = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;
        const file = req.file;
        const filePath = path.join(__dirname, '../../', file.path);
        console.log(`filePath :: ${filePath}`);
        const fileInfo = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) reject(err);
                resolve(metadata);
            });
        });

        if (fileInfo.format.duration > 1800) {
            fs.unlinkSync(filePath);
            return res.status(400).json({
                error: 'File duration exceeds 30 minutes'
            });
        }

        const compressedFilePath = `${filePath}-compressed.mp4`;
        await new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .output(compressedFilePath)
                .videoCodec('libx264')
                .size('640x?')
                .on('end', resolve)
                .on('error', reject)
                .run();
        });

        const fileContent = fs.readFileSync(compressedFilePath);
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${Date.now()}-${file.originalname}`,
            Body: fileContent,
            ACL: 'public-read'
        };

        const s3Data = await s3.upload(params).promise();
        fs.unlinkSync(filePath);
        fs.unlinkSync(compressedFilePath);

        const newFile = new File({
            title,
            description,
            fileUrl: s3Data.Location,
            metadata: fileInfo
        });

        await newFile.save();
        res.status(200).json(newFile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};