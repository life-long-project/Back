const upload = require("../../multer");
const {uploadImage,uploadIDs,uploadIDsDummy} = require("../../cloudinary");
const express = require('express')
const { translate } = require('bing-translate-api');
const router = express.Router()


router.post(
    "/",
    // passport.authenticate("jwt", { session: false }),
    upload,
    (req, res) => {
        const files = req.files;
        const responses = [];
        const f_response = [];

        // Upload images to Cloudinary
        // todo: can make this function just return the url as img_url in the req to continue your process
        files.forEach((file) => {
            uploadImage(file, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                responses.push(result);
                if (responses.length === files.length) {
                    responses.forEach((resp) => {
                        f_response.push({
                            url: resp.secure_url,
                            public_id: resp.public_id,
                            format: resp.format,
                        });
                    });
                    return res.send(f_response);
                }
            });
        });
    }
);



router.post(
    "/id",
    // passport.authenticate("jwt", { session: false }),
    upload,
     (req, res) => {
        const files = req.files;
        const responses = [];
        const f_response = [];

        // Upload images to Cloudinary
        // todo: can make this function just return the url as img_url in the req to continue your process
        files.forEach((file) => {
            uploadIDsDummy(file, async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                responses.push(result);
                if (responses.length === files.length) {
                    for (const resp of responses) {
                        let data = resp['info']['ocr']['adv_ocr']['data'][0]['textAnnotations'][0]["description"]
                        let pure_result
                        data = data.replace(/(\r\n|\n|\r)/gm, " ");
                        await translate(data, null, 'en').then(res => {
                            pure_result = res.translation.trim()
                        }).catch(err => {
                            console.error("translation error: " + err);
                        });
                        // console.log(pure_result)
                        f_response.push(pure_result)
                        // todo: need to make search for all parts to ge the id
                    }
                    return res.send(f_response);
                }
            });
        });
    }
);




module.exports = router
