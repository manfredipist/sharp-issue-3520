const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb({message: 'Errore durante la validazione del file'}, false)
        }
    }
});

const { validationResult } = require('express-validator');


const _society = require("../../controllers/society")

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

router.post('/society/update/profile', [
    upload.single("picture")
], (req, res) => {
    var err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err)
        res.status(401).json({
            status: "Failure",
            message: "Errore durante la validazione dell'input"
        });
    } else {
        _society.updateProfile(req, res)
    }
});


module.exports = router;
