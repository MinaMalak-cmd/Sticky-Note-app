import userModel from "../../../../DB/models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  // const users = await userModel.find().select('userName firstName lastName email phone -_id');
  const users = await userModel.find(
    {},
    {
      userName: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      phone: 1,
      age : 1,
      _id: 1,
      password: 1,
    }
  );
  return res.json({ message: "Done", users });
};
export const getByNameAndAge = async (req, res, next) => {
  const { name, age } = req.query;
  const users = await userModel.find(
    {
      userName : {
        $regex: `^${name}`, 
        $options: 'i'
      },
      age : {
        $lt : age
      }
    },
    {
      userName: 1,
      firstName: 1,
      lastName: 1,
      age:1,
      email: 1,
      phone: 1,
      _id: 1,
      password: 1,
    }
  );
  return res.json({ message: "Done", users });
};
export const addUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      cPassword,
      age,
      gender,
      phone,
    } = req.body;
    if (password != cPassword) {
      return res.json({ message: "Password Mismatch cPassword" });
    }
    if (!["Male", "Female"].includes(gender)) {
      return res.json({ message: "gender must be either Male or Female" });
    }
    const checkMail = await userModel.findOne({ email });
    if (checkMail) return res.json({ message: "Email must be unique" });
    const checkPhone = await userModel.findOne({ phone });
    if (checkPhone) return res.json({ message: "Phone must be unique" });
    const checkUserName = await userModel.findOne({ userName });
    if (checkUserName) return res.json({ message: "User-name must be unique" });
    const user = await userModel.create({
      firstName,
      lastName,
      userName,
      password,
      email,
      age,
      gender,
      phone,
    });
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password, email, phone } = req.body;
    const user = await userModel.findOne({
      $or: [{ email }, { userName }, { phone }],
      password,
    });
    if (!user) {
      return res.json({ message: "Please enter valid credentials" });
    }
    return res.json({
      message: `Hi ${user.firstName} ${user.lastName}`,
      user: { userName: user.userName, age: user.age, gender: user.gender },
    });
  } catch (error) {
    return res.json({ message: "Catch error" });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    // const user = await userModel.findByIdAndUpdate(id,{
    //   firstName, lastName, age
    // }, {
    //   new:true
    // });
    const user = await userModel.updateOne(
      { _id: id },
      {
        firstName,
        lastName,
        age,
      },
      {
        new: true,
      }
    );
    return user.matchedCount
      ? res.json({ message: "Done" })
      : res.json({ message: "Invalid user id" });
  } catch (error) {
    return res.json({ message: "Catch error" });
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await userModel.findByIdAndDelete(id);
    console.log("🚀 ~ file: user.js:112 ~ deleteUser ~ user:", user)

    return user 
      ? res.json({ message: "Done" })
      : res.json({ message: "Invalid user id" });
      
  } catch (error) {

    return (error?.name === "CastError" && error?.kind === "ObjectId") ? res.json({ message: "Invalid user id" }) : res.json({ message: "Catch error" });
  }
};
