const User = require("../models/user");

const getMe = async (req, res) => {
  try {
    const user = req.user._id;
    const userDoc = await User.findById(user, { password: 0 });
    res.status(200).json({
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
module.exports = { getMe };
