const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    visitHistory: [
        { 
          timestamp: {type: Number},
          ip: {type: String},
          country: {type: String},
          city: {type: String},
        }
    ],
    expiresAt: {
      type: Date,
    },
    clicks: {
        type: Number,
        default: 0,
    },  
},{ timestamps: true });

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const URL = mongoose.model("url", urlSchema);

module.exports = URL; 