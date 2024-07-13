const express = require("express");
const {
  add,
  get,
  update,
} = require("../controllers/service/homeServiceController");
const router = express.Router();

router.get("/all", get);
router.post("/add", add);
router.patch("/edit/:id", update);

module.exports = router;
