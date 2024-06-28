const { add, get, destoy } = require("../controllers/otherServiceController");

const router = require("express").Router();

router.get("/get", get);
router.post("/add", add);
router.delete("/delete/:id", destoy);

module.exports = router;
