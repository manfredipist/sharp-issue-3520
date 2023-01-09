const path = require("path");
const fs = require('fs');

const loggerService = require("../services/loggerService");
const imageProcessingService = require("../services/imageProcessingService");


exports.updateProfile = async (req, res) => {
    try{ 
        var imageProcessingResult = null
        if (req.file) {
            var picture_buffer = req.file.buffer;
            imageProcessingResult = await imageProcessingService.storePictureInWebP(picture_buffer);
        }
        res.status(200).json({
            status: "Success",
            message: "Il tuo profilo è stato aggiornato con successo",
            data: {
                picture: imageProcessingResult
            }
        });
    }catch(err){
        loggerService.printError(path.basename(__filename), "updateProfile", err.message);
        res.status(400).json({
            status: "Failure",
            message: err.message
        });
    }
}

