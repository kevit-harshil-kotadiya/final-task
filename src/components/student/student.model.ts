// import bcrypt = require('bcrypt');
import mongoose from "mongoose";

const { Schema, model } = mongoose;
/**
 * Schema for representing student data in the database.
 */
const studentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  studentId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  currentSem: {
    type: Schema.Types.Number,
    required: true,
  },
  phoneNumber: {
    type: Schema.Types.Number,
    required: true,
  },
  department: {
    type: Schema.Types.String,
    required: true,
  },
  batch: {
    type: Schema.Types.Number,
    required: true,
  },
  authToken: {
    type: Schema.Types.String,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  attendance: [Schema.Types.String],
  semAttendance: [
    {
      sem: {
        type: Schema.Types.Number,
      },
      attendance: {
        type: Schema.Types.String,
      },
    },
  ],
});
/**
 * Model representing a student in the database.
 */
const Student = model("Student", studentSchema);
export default Student;
