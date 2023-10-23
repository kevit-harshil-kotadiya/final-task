import mongoose from "mongoose";

const { Schema, model } = mongoose;

const departmentSchema = new Schema({
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  // Year of data
  branches: [
    {
      name: {
        type: Schema.Types.String,
        required: true,
      }, // Name of the branch (CE, ME, EC, etc.)
      totalStudentsIntake: {
        type: Schema.Types.Number,
        required: true,
      }, // Total student intake for this branch
      totalStudents: {
        type: Schema.Types.Number,
      },
    },
  ],
});

const Batch = model("Batch", departmentSchema);

export default Batch;
