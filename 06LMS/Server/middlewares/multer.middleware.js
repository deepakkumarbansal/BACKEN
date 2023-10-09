import path from 'path';
import multer from 'multer';

const upload = multer({
    dest:"uploads/", // file destination
    limits:{fileSize:50*1024*1024}, //50 mb size is max Limit
    storage:multer.diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null, file.originalname); // file ka jo original name tha vhi rhega
        },
    }),
    fileFilter:(req,file, cb)=>{
        const ext = path.extname(file.originalname);
        if( // inn files ke alava koi aur file format aega tho error milega
            ext !== '.jpg' &&
            ext !== '.jpeg' &&
            ext !== '.webp' &&
            ext !== '.png' &&
            ext !== '.mp4'
        ){
            cb(new Error(`Unsupported file type ! ${ext}`), false)
        }
        cb(null, true)
    },

});

export default upload;