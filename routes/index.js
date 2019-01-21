var path = require("path");
var express = require("express");
var router = require("express").Router();
var apiRoutes = require("./apiRoutes.js");





// API Routes
router.use("/api/users", apiRoutes);

router.use(express.static('public'));

module.exports = router;