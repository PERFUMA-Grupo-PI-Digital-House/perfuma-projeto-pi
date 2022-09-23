const multer = require('multer');
const crypto = require("crypto");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname + "/../../img/");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        // Pegar extensão do arquivo
        const extension = file.originalname.split(".")[1];
        // Gera string randomica
        const newName = crypto.randomBytes(10).toString("hex");
        // const imageName = Date.now() + file.originalname;
        // Altera o nome do arquivo para a string randomica
        callback(null, `${newName}.${extension}`);
    },
});

const upload = multer({ storage: storage,});

module.exports = upload;