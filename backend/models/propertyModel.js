import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const propertySchema =  mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    nearbySchools: {
      type: String, 
      required: false,
    },
    nearbyHospitals: {
      type: String, 
      required: false,
    },
    nearbySuperMarkets:{
      type: String, 
      required: false ,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    swimmingPool: {
      type: Boolean,
      required: true,
      default: false,
    },
    parkingSpace: {
      type: Number,
      default: 0,
    },
    state: {
        type: String,
        required: true,
      },
    toilets: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
    images: {
      type: [String], // An array of strings
      required: true, // or false if it's optional
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
