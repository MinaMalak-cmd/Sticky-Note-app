import { Schema, model } from "mongoose";

// we use new keyword to avoid static memory allocation
// and use instead dynamic memory allocation
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age : Number,
  gender:{
    type: String,
    default: 'Male',
    enum: ['Male', 'Female'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  // posts : {
  //   type : Array,
  //   ref:'Post',
  //   required: false
  // }
}, {
  timestamps:true
});

const userModel = model('User', userSchema);

export default userModel;

