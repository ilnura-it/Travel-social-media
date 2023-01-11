import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    //console.log(req.headers);
   const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
    /*  if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }*/
    decodedData = await jwt.verify(token, secret);
    req.userId = decodedData?.id;
    //console.log(decodedData + ' identity', req.userId);
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.id;
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;