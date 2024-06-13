const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;

// routers

const serviceRouter = require("./routes/serviceRoute");

const categoryRouter = require("./routes/categoriesRoutes");
const subCategoryRouter = require("./routes/subCategoriesRoute");
const subSubCategoryRouter = require("./routes/subSubCategoriesRoute");

const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const rentRouter = require("./routes/rentRoutes");

const aboutRouter = require("./routes/aboutRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const contactRouter = require("./routes/contactRoutes");

const faviconRouter = require("./routes/faviconRoutes");
const logoRouter = require("./routes/logoRoutes");

const themeRouter = require("./routes/themeRoutes");

const adminRouter = require("./routes/administratorRoute");
const seoRouter = require("./routes/seoRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/services", serviceRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/rent", rentRouter);

app.use("/about", aboutRouter);
app.use("/contact", contactRouter);

app.use("/favicon", faviconRouter);
app.use("/logo", logoRouter);
app.use("/banner", bannerRouter);

app.use("/categories", categoryRouter);
app.use("/sub-categories", subCategoryRouter);
app.use("/sub-sub-categories", subSubCategoryRouter);

app.use("/themes", themeRouter);

app.use("/admins", adminRouter);
app.use("/seo", seoRouter);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
