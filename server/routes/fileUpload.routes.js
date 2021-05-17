const { Router } = require("express");

const fileUploader = require("../configs/cloudinary.config");

const router = Router();

/* POST - upload images   */
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});

module.exports = router;
