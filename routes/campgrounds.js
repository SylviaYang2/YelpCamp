const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedin, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')
const { storage } = require('../cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedin,
        upload.array('campgrounds[image]'),
        validateCampground,
        catchAsync(campgrounds.createCampground))
// .post(upload.array('campground[image]'), (req, res) => {
//     console.log(req.body, req.files)
//     res.send("it worked")
// })

router.get('/new', isLoggedin, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedin, isAuthor, upload.array('campgrounds[image]'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedin, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;