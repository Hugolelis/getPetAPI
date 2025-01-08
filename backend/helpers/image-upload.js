import multer from 'multer'
import path from 'path'

// destination to store the images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("pets")) {
            folder = "pets"
        }

        cb(null, `public/imgs/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})