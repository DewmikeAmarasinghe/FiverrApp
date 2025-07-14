import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5]
    },
    desc: {
      type: String,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
      min: 0
    },
    orderDuration: {
      type: Number,
      required: true,
      min: 1
    },
    sellerResponse: {
      type: String,
      default: null
    },
    sellerResponseDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

export default model("Review", ReviewSchema);