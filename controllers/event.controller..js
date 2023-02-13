const Event = require("../models/event");

const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate, location } = req.body;
    const eventBanner = req.file;
    const event = new Event({
      name,
      description,
      startDate,
      endDate,
      location,
      banner:eventBanner.path
    });
    await event.save();

    res.status(201).json({
      success: true,
      message: `Event has been added successfully!`,
      event,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json({
      allEvents,
    });
  } catch (error) {
    console.log(error);
  }
};
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventDoc = await Event.findById(eventId);
    if (!eventDoc) {
      res.status(400).json({
        message: "No event found",
      });
    }
    res.status(200).json({
      event: eventDoc,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createEvent, getAllEvents, getEventById };
