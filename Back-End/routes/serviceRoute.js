const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getServices,
  addService,
  getServicebyId,
  editService,
  deleteService,
} = require("../controllers/serviceController");

//---------multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/services");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyAdmin, upload.single("image"), addService);
router.get("/all", getServices);
router.get("/single/:id", getServicebyId);
router.patch("/edit/:id", verifyAdmin, upload.single("image"), editService);
router.delete("/delete/:id", deleteService);

module.exports = router;
