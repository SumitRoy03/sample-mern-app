import User from "../model/User.js";
import bcrypt from "bcryptjs";
// import { createError } from "../error.js";

//  REGISTER USER

export const register = async (req, res, next) => {
  try {
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user has been created successfully!");
  } catch (err) {
    next(err);
  }
};

// LOGIN USER

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // next(createError(404, "oops!, user not found!"));
      return res.status(200).send({ username: "404" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      // next(createError(400, "wrong credentials!"));
      console.log("wrong password");
      return res.status(200).send({ username: "unauthorized" });
    }
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};
