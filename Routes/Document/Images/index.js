var express = require('express'),
router = express.Router();
const multer = require('multer');
const {ObjectId} = require('mongodb');
const fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Documents')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
    })
var upload = multer({ storage: storage })

router
    .get('/:id', function (req, res) {
        db.collection("images").find(req.params.id == "all" ? {}:{relate : req.params.id}).project({ file:0 }).toArray((err, result) => {
            if (err) throw err;
            res.send(result)
        })
    })
    .post('/', upload.array('picture'), (req, res) => {
        console.log('here')
        const files = req.files
        console.log(files)
        let response = {
            count : files.length,
            UploadedFiles : [],
            errorWithFiles : [],
            success : 0,
            error : 0
        }
        let a = 0 
        files.forEach((element,index) => {
            var img = fs.readFileSync(element.path);
            var encode_image = img.toString('base64');
            var finalImg = {
                title: req.body.title,
                relate:req.body.relate,
                contentType: element.mimetype,
                file: new Buffer(encode_image, 'base64')
            };
            db.collection('images').insertOne(finalImg, (err, result) => {
                if (err) return response.errorWithFiles.push(element.originalname)
                response.UploadedFiles.push(element.originalname)
                response.success += 1
                a = 1
                if(index == files.length-1){
                    response.error = response.count - response.success
                    res.send(response)
                }

            })

        });
       
    })
    .delete('/:id', function (req, res) {
        //console.log(req.header('auth'))
        req.header('auth') == "true" ?  db.collection("images").remove(req.params.id == "all" ? {}:{relate : req.params.id},(err, result) => {
            if (err) throw err;
            console.log(result)
            res.send(result)
        }) :res.send("Invalid Request")
       
      })
      .delete('/image/:id', function (req, res) {
        //console.log(req.header('auth'))
        req.header('auth') == "true" ?  db.collection("images").remove(req.params.id == "all" ? {}:{_id :ObjectId(req.params.id)},(err, result) => {
            if (err) throw err;
            console.log(result)
            res.send(result)
        }) :res.send("Invalid Request")
       
      })
      
      .get('/view/:id', (req, res) => {
        var filename = req.params.id;

        db.collection('images').findOne({
            '_id': ObjectId(filename)
        }, (err, result) => {

            if (err) return console.log(err)

            res.contentType(result.contentType);
            res.send(result.file.buffer)


        })
    })

module.exports = router;