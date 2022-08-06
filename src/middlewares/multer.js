const multer = require('multer');
const crypto = require("crypto");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname + "/../../uploads/");
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

const upload = multer({ storage: storage,
    // fileFilter: function (req, file, callback) {
    //     var ext = path.extname(file.originalname);
    //     if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //         return callback(new Error('Apenas imagens são permetidas!'))
    //     }
    //     callback(null, true)
    // },
    // limits:{
    //     fileSize: 1024 * 1024
    // }
})//.single('avatar');

module.exports = upload;