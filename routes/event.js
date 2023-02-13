const router = require("express").Router();
const { ROLES } = require("../constants");
const role = require("../middlewares/role");
const auth = require("../middlewares/auth");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

// multer upload feature
const parser = multer({ storage: storage });

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
module.exports = router;
