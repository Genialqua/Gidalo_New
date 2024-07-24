import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Corrected typo
        ref: "User",
    },
    favouriteItems: [
        {
            title: { type: String, required: true },
            images: { type: String, required: true },
            price: { type: Number, required: true },
            property: {
                type: mongoose.Schema.Types.ObjectId, 
                required: true,
                ref: "Property"
            }
        }
    ]
}, {
    timestamps: true,
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
