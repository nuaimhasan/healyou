const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/service/categoryControllers");

router.post("/add", addCategory);
router.get("/all", getCategories);
router.get("/:id", getCategory);

router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
