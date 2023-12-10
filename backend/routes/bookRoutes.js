const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const auth = require("../middleware/auth");

//@routes   POST /api/book/addbook
//@desc     add new book
//@access   Private
router.post("/addbook", auth, async (req, res) => {
  try {
    let { title, author } = req.body;

    //new book
    const newBook = new Book({ user: req.user.id, title, author });

    await newBook.save();

    return res.status(200).json({ success: true, newBook });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

//@routes   POST /api/book/updatebook/:id
//@desc     update book
//@access   Private
router.patch("/updatebook/:id", auth, async (req, res) => {
  try {
    let bookFind = await Book.findById(req.params.id);

    if (!bookFind) {
      return res.status(404).json({ success: false, error: "book not found!" });
    }

    //Create Update Object
    let updateFields = {};

    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.author) updateFields.author = req.body.author;

    const udpatedBook = await Book.findOneAndUpdate(
      { _id: { $eq: req.params.id } },
      updateFields,
      { new: true }
    );

    return res.status(201).json({ success: false, udpatedBook });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

//@routes   POST /api/book/deletebook/:id
//@desc     delete book
//@access   Private
router.delete("/deletebook/:id", auth, async (req, res) => {
  try {
    let bookFind = await Book.findById(req.params.id);

    if (!bookFind) {
      return res.status(404).json({ success: false, error: "book not found!" });
    }

    await bookFind.deleteOne();

    return res.status(200).json({ success: true, message: "book removed" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

//@routes   POST /api/book/getbooks
//@desc     get auth user books
//@access   Private
router.get("/getbooks", auth, async (req, res) => {
  try {
    let books = await Book.find({ user: req.user.id });

    if (!books) {
      return res.status(404).json({ success: false, error: "No book found!" });
    }

    return res.status(200).json({ success: true, total: books.length, books });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

module.exports = router;
