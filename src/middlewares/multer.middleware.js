import multer from "multer";

const storage = multer.diskStorage({ //there are 2 types of storage disk and memory storage ...memory is not a good option as it will store everthing on our memory and our storage will get affected with that ...it is preferred to store it in diskStorage

    destination: function (req, file, cb) {//cb=callback
      cb(null, './public/temp') //apne device pe uploaded image ./public/temp me rahegi
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)//jo naam se user apne ko file dega apun us ko wahi naam se save kar dege (change nai karge kuch bhi )...change kar sakte hai in the similar format as below:
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  
  
export const upload = multer({ storage })