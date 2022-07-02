const commentRouter = require('express').Router();
const fs = require('fs')
const Comment = require('../../db/models/comment.model');

const multer = require('multer')
// const upload = multer({ dest: `${__dirname}/public` })
const uploadFolder = `${__dirname}/../../../public/`

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subFolder = 'files';

    if (file.fieldname === 'avatar') {
      subFolder = 'avatars';
    }

    if (file.fieldname === 'receipt_photo') {
      subFolder = 'receipt_photos';
    }
    fs.mkdirSync(`${uploadFolder}/uploads/${subFolder}`, { recursive: true });
    cb(null, `${uploadFolder}/uploads/${subFolder}`)
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileExt = file.originalname.split('.')[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt)
  }
})

const upload = multer({ storage: storage })

commentRouter.post('/add', upload.single('image'), async (req, res) => {
  const bankObj = req.body;

  if (req.file && req.file.filename) {
    bankObj.image = req.file.filename;
  }

  let bank = new Comment(bankObj);

  try {
    bank = await bank.save();
    res.status(201).json({
      status: true,
      data: { bank },
    });
  } catch (error) {
    console.log('errorMessage', error.message)
    res.status(500).json({
      status: false,
      message: error.message,

    });
  }
});

// commentRouter.patch(
//   '/update/:id',
//   async (req, res) => {
//     const { id } = req.params;
//     try {
//       let bank = await Comment.findOne({ _id: id });
//       if (!bank) {
//         res.status(404).json({
//           status: false,
//           message: 'No Comment Found',
//         });
//       }
//       Object.keys(req.body).forEach((el) => {
//         console.log("bank inisde obj keys", bank, bank[el], req.body);
//         bank[el] = req.body[el];
//       });
//       console.log(Object.keys(req.body))
//       // if (req.file && req.file.filename) {
//       //   bank.image = req.file.filename;
//       // }
//       bank = await bank.save();
//       res.status(200).json({
//         status: true,
//         data: { bank },
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: false,
//         message: error.message,
//       });
//     }
//   }
// );

commentRouter.patch(
  '/update/:id',
  async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try {
      let result = await Comment.findByIdAndUpdate(
        { _id: id },
        {
          "$set": {
            account_name: req.body.account_name
          }
        },
        { new: true }
      );
      console.log(result);
      res.status(200).json({
                status: true,
                data: { result },
              });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
);

commentRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bank = await Comment.findOneAndDelete({ _id: id });
    if (!bank) {
      res.status(404).json({
        status: false,
        message: 'No Comment Found',
      });
    }
    res.status(200).json({
      status: true,
      message: 'Deleted Successfully',
      data: { bank },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

commentRouter.get('/', async (req, res) => {
  try {
    const banks = await Comment.find({});
    if (!banks.length) {
      return res.status(404).json({
        status: false,
        message: 'No Comment Found',
      });
    }
    res.status(200).json({
      status: true,
      data: { banks },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = commentRouter