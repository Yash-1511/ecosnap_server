const router = require("express").Router();
const { ROLES } = require("../constants");
const role = require("../middlewares/role");
const auth = require("../middlewares/auth");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { s3Upload } = require("../utils/storage")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Image = require("../models/image")
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
  },
});
const awsstorage = multer.memoryStorage();
// multer upload feature
const parser = multer({ storage: storage });
const upload = multer({ awsstorage });
const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/event.controller.");
// create an event
router.post(
  "/event",
  auth,
  role.check(ROLES.Admin, ROLES.Moderator),
  parser.single("banner"),
  createEvent
);

// list all events
router.get("/events", getAllEvents);

// list specifid event
router.get("/event/:id", getEventById);

// upload image of specific event
router.post("/event/:id/image", auth,upload.single('image'), async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const image = req.file;

    const { imageUrl,imageKey } = await s3Upload(image);
    const uploadImage = new Image({
      event: eventId,
      user: req.user._id,
      imageUrl
    })
    await uploadImage.save();
    res.json({
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
