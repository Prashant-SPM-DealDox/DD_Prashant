// const path = require('path')
// const multer = require('multer')

// var storage = multer.diskStorage({
//     destination: function(req, file, cd){
//         createBrotliCompress(null, 'uploads/')
//     },
//     filename: function(req, file, cb){
//        const uniquesuffix = Date.now();
//        cb(null, uniquesuffix + file.originalname)
//     }
// })

// var upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, callback){
//         if(
//             file.mimetype ==  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//             file.mimetype ==  "application/msword"
//         ){
//             callback(null, true)
//         }else{
//             console.log("only docx and doc files")
//             callback(null, false)
//         }
//     },
//     limits:{
//         fileSize: 1024 * 1024 * 2
//     }
// })

// module.exports = upload