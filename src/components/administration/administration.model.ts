import mongoose from "mongoose";

const { Schema, model } = mongoose;

const administrationSchema = new Schema({
  administratorName: {
    type: Schema.Types.String,
    required: true,
  },
  profile: {
    type: Schema.Types.String,
    required: true,
  },
  administratorId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

const Administration = model("Administration", administrationSchema);

export default Administration;
