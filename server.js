const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();


// const allowedOrigins = ["https://pbl-2.vercel.app"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
// Load sample data
// const { data: sampleListings } = require("./init/data");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
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
app.put("/patents/:id", async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body.listing, { new: true });
    res.status(200).json(updatedListing);
  } catch (err) {
    console.error("Failed to update listing:", err);
    res.status(500).json({ error: "Failed to update" });
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


const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: "gallery",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo
        ? ["mp4", "webm", "mov", "avi"]
        : ["jpg", "jpeg", "png"],
    };
  },
});

const Image = require("./models/image");
const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024,    // ← 200 MB max per file
  },
});


app.get("/gallery", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.post(
  "/gallery/upload",
  upload.single("image"),  // ← field name “image”
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Multer-Storage-Cloudinary sets:
      //   req.file.path     = secure_url
      //   req.file.filename = public_id
      const isVideo = req.file.mimetype.startsWith("video/");
      const newItem = new Image({
        url: req.file.path,
        public_id: req.file.filename,
        type: isVideo ? "video" : "image",
      });

      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      console.error("Upload failed:", err.message);
      // Send the real message back so you can see what’s going on
      res.status(500).json({ error: err.message });
    }
  }
);



// Delete image from DB (and optionally the filesystem)
app.delete("/gallery/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from MongoDB
    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Error deleting image:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const BookChapter = require("./models/bookChapter.js");

app.use(express.json());

// ✅ Get all book chapters
app.get("/book-chapters", async (req, res) => {
  const items = await BookChapter.find();
  res.json(items);
});

// ✅ Add a book chapter
app.post("/book-chapters", async (req, res) => {
  const { title, authors, chapter } = req.body;
  const newChapter = new BookChapter({ title, authors, chapter });
  await newChapter.save();
  res.status(201).json(newChapter);
});

// ✅ Delete a book chapter
app.delete("/book-chapters/:id", async (req, res) => {
  try {
    await BookChapter.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Import your model
const PhdStudent = require('./models/phdStudent'); // adjust the path based on your project

// ✅ Get all Ph.D. students
app.get("/phdstudents", async (req, res) => {
  try {
    const students = await PhdStudent.find({});
    res.json(students);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Add a new Ph.D. student
app.post("/phdstudents", async (req, res) => {
  try {
    const newStudent = new PhdStudent(req.body.listing);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Failed to save student:", err);
    res.status(500).json({ error: "Failed to save" });
  }
});

// ✅ Delete a Ph.D. student
app.delete("/phdstudents/:id", async (req, res) => {
  try {
    await PhdStudent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
