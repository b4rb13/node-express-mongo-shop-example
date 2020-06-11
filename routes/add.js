const { Router } = require("express");
const Course = require("../models/course.js");
const { validationResult } = require("express-validator");
const { courseValidators } = require("../utils/validators");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Add Course",
    isAdd: true,
  });
});

router.post("/", auth, courseValidators, async (req, res) => {
  const errors = validationResult(req);

  const { title, price, img } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Add course",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title,
        price,
        img,
      },
    });
  }

  const course = new Course({ title, price, img, userId: req.user });

  try {
    await course.save();
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
