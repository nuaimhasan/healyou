const { add, get, update } = require("../controllers/counterController");

const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/counter";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/get", get);
router.post("/add", upload.single("bgImage"), add);
router.patch("/update/:id", upload.single("bgImage"), update);

module.exports = router;
