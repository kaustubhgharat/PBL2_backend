const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    description: {
      type: String,
      required: true,
    },
  });

const Listing = mongoose.model( "Listing", listingSchema);
module.exports=Listing;

