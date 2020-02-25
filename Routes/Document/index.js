var express = require('express')
const Folder = require('./Folder/index')
const Images = require('./Images/index')
router = express.Router();


router
    .get('/', function (req, res) {
        res.send('We Are In The Documents Api <3')
    })
    .use('/folder', Folder)
    .use('/images',Images)




module.exports = router;