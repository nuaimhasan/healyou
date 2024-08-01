const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  get,
  getSingle,
  add,
  update,
  destroy,
} = require("../controllers/blogController");

//---------multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), add);
router.get("/all", get);
router.get("/:id", getSingle);
router.patch("/edit/:id", verifyAdmin, upload.single("image"), update);
router.delete("/delete/:id", destroy);

module.exports = router;
