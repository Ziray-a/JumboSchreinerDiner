const helper = require('../helper.js');
const express = require('express');
const fhelper =require("../fileHelper.js");
var serviceRouter = express.Router();

console.log('- Service DateiUploadEinzeln');

serviceRouter.post('/dateiuploadeinzeln', async(request, objponse) => {
    console.log('Service DateiUploadEinzeln called');
    try {

        // if no files received, send error
        if (!request.files) {
            console.log('no file transmitted, nothing to do');
            objponse.status(400).json({'fehler': true, 'nachricht': 'Keine Dateien aufgeladen'});
        } else {

            // get handle on file info, in this example is 'picture' the HTML Field Name
            var picture = request.files.picture;


            // if we want to save the file physically in a directory (/files) on the server, we can use the 'mv' (move) function
            // if target directory is not existent, it is created automatically
            // keep in mind that the files have to use unique file names, otherwise they are overwritten!
            var newname=fhelper.createRandomFilename(20,picture.name.split(".")[1])
            console.log('saving file to target directory on server');
            picture.mv('./files/' + newname);

            
            /////////////////////////////////////////////////////////
            // do anything what you want with this data
            /////////////////////////////////////////////////////////


            console.log('creating response');
            var obj = {
                status: true,
                fileSaved: false,
                fileName: newname,
                fileSize: picture.size,
                fileMimeType: picture.mimetype,
                fileEncoding: picture.encoding
            };

            // send objponse
            objponse.status(200).json(obj);
        }
        

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
        console.log(err)
    }
    
});

module.exports = serviceRouter;