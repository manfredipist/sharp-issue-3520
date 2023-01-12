const path = require("path");
const sharp = require('sharp');
const Crypto = require('crypto');

const loggerService = require("../services/loggerService");

module.exports = {
    storePictureInWebP: async function(binaryImage){
        try{
            const fileName = Crypto.randomUUID({disableEntropyCache : true})+".webp";
            const filePath = 'public/assets/uploads/'+fileName;
            const sharpInstance = await sharp(binaryImage)
            .webp({ 
                nearLossless: true, 
                quality: 70 
            })
            .toFile(filePath);
            return filePath.slice(7);
        }catch(err){
            loggerService.printError(path.basename(__filename), "storePictureInWebP", err.message);
            throw new Error("Errore durante la memorizzazione della foto da te caricata");
        }
    }
}