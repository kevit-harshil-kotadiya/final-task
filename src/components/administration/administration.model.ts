import mongoose from "mongoose";

const { Schema, model } = mongoose;
// Define the schema for the Administration model
const administrationSchema = new Schema({
    // Administrator's name, required field
  administratorName: {
    type: Schema.Types.String,
    required: true,
  },
    // Profile of the administrator (e.g., 'admin', 'staff'), required field
  profile: {
    type: Schema.Types.String,
    required: true,
  },
    // Unique identifier for the administrator, required and must be unique
  administratorId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
    // Password for the administrator, required field
  password: {
    type: Schema.Types.String,
    required: true,
  },
    // Array of tokens associated with the administrator for authentication
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});
// Create a model named "Administration" using the defined schema
const Administration = model("Administration", administrationSchema);
// Export the "Administration" model
export default Administration;
