var path = require("path");
var express = require("express");
var router = require("express").Router();
var apiRoutes = require("./apiRoutes.js");





// API Routes
router.use("/api/users", apiRoutes);

router.use(express.static('public'));

// HTML routes
router.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/contact-card.html"));
});
router.get('/resume', function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/resume-card.html"));
});
router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/about-card.html"));
});
router.get('/works', function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/works-card.html"));
});
router.get('/portfolio', function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/works-card.html"));
});
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

module.exports = router;