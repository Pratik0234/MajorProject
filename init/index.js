const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const allListing = require("./data.js");

const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = "pk.eyJ1IjoicHdhZ2gyMzQiLCJhIjoiY2x5ZDkzeTFpMDNvajJsc2hsdTFqYzQyaiJ9.A3343m63wlLwJnoZ3Ep7tg";
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connection successful with db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  console.log(1);
  for (let listing of allListing) {
    let response = await geocodingClient.forwardGeocode({
      query: listing.location,
      limit: 1,
    }).send();
    listing.geometry = response.body.features[0].geometry;
  }

  const updatedData = allListing.map((obj) => ({
    ...obj,
    owner:  "668e64ad842b2e82558f1685",
  }));
  console.log(updatedData);
  await Listing.insertMany(updatedData);
  console.log("Data was initialized");
};

initDB();

 