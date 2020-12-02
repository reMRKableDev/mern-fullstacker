const { Router } = require("express");
const router = Router();

const fileUploader = require("../configs/cloudinary.config");

/* POST - upload images   */
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  //console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the path from req.file and pass it along
  const { path } = req.file;

  // The variable 'cloudinary_url', but this can be any name, just make sure you remember to use the same in frontend
  res.status(200).json({ cloudinary_url: path });
});

module.exports = router;
