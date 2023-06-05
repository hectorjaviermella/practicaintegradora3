import { userModel } from "./model/user.js";

class User {
  constructor() {}
  
 

  getUsers = async () => {
    const user = await userModel.find();
    return user;
  };

  getUsersById = async (username) => {
    console.log("entra al user.model");
    const user = await userModel.findOne({ email: username }).lean();
    return user;
  };

  createUser = async (user) => {
    const createdUser = await userModel.create(user);
    return createdUser;
  };
}

export const userMongo = new User();