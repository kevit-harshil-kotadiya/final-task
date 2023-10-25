import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Department schema representing a batch of students in a specific year.
 * @typedef {Object} DepartmentSchema
 * @property {number} year - Year of data (required)
 * @property {Branch[]} branches - An array of branch objects
 */

/**
 * Branch information within the department schema.
 * @typedef {Object} Branch
 * @property {string} name - Name of the branch (e.g., CE, ME, EC, etc.) (required)
 * @property {number} totalStudentsIntake - Total student intake for this branch (required)
 * @property {number} totalStudents - Total number of students (optional)
 */

const departmentSchema = new Schema({
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  branches: [
    {
      name: {
        type: Schema.Types.String,
        required: true,
      },
      totalStudentsIntake: {
        type: Schema.Types.Number,
        required: true,
      },
      totalStudents: {
        type: Schema.Types.Number,
      },
    },
  ],
});

/**
 * Represents a batch model based on the department schema.
 * @class Batch
 */
const Batch = model("Batch", departmentSchema);

export default Batch;
