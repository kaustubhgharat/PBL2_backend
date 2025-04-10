const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

// const allowedOrigins = ["https://pbl-2.vercel.app"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Load sample data
// const { data: sampleListings } = require("./init/data");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://gharatkaustubh36:kaustubh@cluster0.5ec9wco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json("hello");
});

// ✅ Replaces the static sampleListings
app.get("/patents", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/patents", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    console.error("Failed to save listing:", err);
    res.status(500).json({ error: "Failed to save" });
  }
});

app.delete("/patents/:id", async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});
//talks
const Talk = require("./models/talk");

app.get("/talks", async (req, res) => {
  const talks = await Talk.find();
  res.json(talks);
});

app.post("/talks", async (req, res) => {
  const newTalk = new Talk(req.body.listing);
  await newTalk.save();
  res.status(201).json(newTalk);
});

app.delete("/talks/:id", async (req, res) => {
  await Talk.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

//conference publications
const ConferencePublication = require("./models/conferencePublication");

// GET all conference publications
app.get("/conferencepublications", async (req, res) => {
  try {
    const publications = await ConferencePublication.find();
    res.json(publications);
  } catch (err) {
    console.error("Error fetching conference publications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new conference publication
app.post("/conferencepublications", async (req, res) => {
  try {
    const newPublication = new ConferencePublication(req.body.listing);
    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (err) {
    console.error("Error saving conference publication:", err);
    res.status(500).json({ error: "Failed to save" });
  }
});

// DELETE a conference publication
app.delete("/conferencepublications/:id", async (req, res) => {
  try {
    await ConferencePublication.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting conference publication:", err);
    res.status(500).json({ error: "Failed to delete" });
  }
});

//Research
const Research = require("./models/research");

app.get("/research", async (req, res) => {
  try {
    const researchItems = await Research.find();
    res.json(researchItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch research items" });
  }
});

app.post("/research", async (req, res) => {
  try {
    const newResearch = new Research(req.body.listing);
    await newResearch.save();
    res.status(201).json(newResearch);
  } catch (err) {
    res.status(500).json({ error: "Failed to save research item" });
  }
});

app.delete("/research/:id", async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete research item" });
  }
});
//awards
const Award = require("./models/award");

// Get all awards
app.get("/awards", async (req, res) => {
  const awards = await Award.find();
  res.json(awards);
});

// Add a new award
app.post("/awards", async (req, res) => {
  const newAward = new Award(req.body.listing);
  await newAward.save();
  res.status(201).json(newAward);
});

// Delete an award
app.delete("/awards/:id", async (req, res) => {
  await Award.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

//about
const About = require("./models/about");

// GET all about items
app.get("/about", async (req, res) => {
  const items = await About.find();
  res.json(items);
});

// POST a new about item
app.post("/about", async (req, res) => {
  const newItem = new About(req.body.listing);
  await newItem.save();
  res.status(201).json(newItem);
});

// Delete an about item
app.delete("/about/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
