const bcrypt = require("bcryptjs");

const setupDB = require("./dbconnection");
const { ROLES } = require("../constants");
const User = require("../models/user");

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

const seedDB = async () => {
  try {
    console.log("seed db started");

    if (!email || !password) throw new Error("missing arguments");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is in use");
    }
    const user = new User({
      email,
      password,
      username: "admin",
      role: ROLES.Admin,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    await user.save();

    console.log("seed db finished");
    return {};
  } catch (error) {
    console.log("error while seeding database");
    console.log(error);
    return null;
  }
};
(async () => {
  await setupDB().then(async () => {
    await seedDB();
  });
})();
