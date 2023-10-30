const Book = require("../model/book.model");


//Get All Books
exports.index = async (req, res) => {
    try {
      const start = parseInt(req?.query?.start) || 0;
      const limit = parseInt(req?.query?.limit) || 10;
      const skipAmount = start * limit;
  
      const book = await Book.find({})
        .sort({ createdAt: -1 })
        .skip(skipAmount)
        .limit(limit);
  
      return res.status(200).send({ status: true, message: "Book Founds !!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({
          status: false,
          message: error.message || "Internal Server Error",
        });
    }
  };

//create Books api
exports.store = async (req, res) => {
    try {
      if (!req.body || !req.body.title || !req.body.author || !req.body.summary) {
        return res.status(400).json({status:false,message:"Opps Invalid Details!!"})
      }
      const book = new Book()
      book.title = req.body.title;
      book.author = req.body.author;
      book.summary = req.body.summary;
      await book.save()
      return res.status(200).json({status:true,message:"Book Created !!"})
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          status: false,
          message: error.message || "Internal Server Error",
        });
    }
  };


//Particular book by Id
exports.edit = async (req, res) => {
  try {
    if (!req.params.bookId) {
        return res.status(400).json({status:false,message:"Opps Invalid Details"})
    }
    const book = await Book.findById(req.params.bookId)
    if (!book) {
        return res.status(404).json({status:false,message:"Book Not Found !!"})
    }
    return res.status(200).send({ status: true, message: "Book Found !!",book});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        status: false,
        message: error.message || "Internal Server Error",
      });
  }
};


//Particular book Update
exports.update = async (req, res) => {
    try {
      if (!req.params.bookId) {
          return res.status(400).json({status:false,message:"Opps Invalid Details"})
      }
      const book = await Book.findById(req.params.bookId)
      if (!book) {
          return res.status(404).json({status:false,message:"Book Not Found !!"})
      }
      book.title = req.body.title ? req.body.title : book.title
      book.author = req.body.author ? req.body.author :  book.author
      book.summary = req.body.summary? req.body.summary :  book.summary
      await book.save()
      return res.status(200).send({ status: true, message: "Book Updated !!",book});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({
          status: false,
          message: error.message || "Internal Server Error",
        });
    }
  };

  //Particular book Delete
exports.delete = async (req, res) => {
    try {
      if (!req.params.bookId) {
          return res.status(400).json({status:false,message:"Opps Invalid Details"})
      }
      const book = await Book.findByIdAndDelete(req.params.bookId)
      if (!book) {
          return res.status(404).json({status:false,message:"Book Not Found !!"})
      }
      
      return res.status(200).send({ status: true, message: "Book Deleted !!"});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({
          status: false,
          message: error.message || "Internal Server Error",
        });
    }
  };