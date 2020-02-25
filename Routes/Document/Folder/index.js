var express = require('express'),
router = express.Router();
const {ObjectId} = require('mongodb');


router
    .get('/:id', function (req, res) {
        db.collection("folders").find(req.params.id == "all" ? {}:{relate : req.params.id}).toArray((err, result) => {
            if (err) throw err;
            console.log(result)
            res.send(result)
        })
    })
    .post('/', function (req, res) {
                const Folder = {
            Name : req.body.Name,
            desc : req.body.desc,
            cover:req.body.cover,
            parent : req.body.parent
        }
        db.collection('folders').insertOne(Folder, (err, result) => {
            if (err) {console.log(err)
                return res.send('an Error Occured')}
            res.send(result)

        })
    })
    .delete('/:id', function (req, res) {
        req.header('auth') == "true" ?   db.collection('folders').remove({_id :ObjectId(req.params.id)}, (err, result) => {
            if (err) {console.log(err)
                return res.send('an Error Occured')}
            res.send(result)
        }) :res.send("Invalid Request")
        
    })
    .put('/:id', function (req, res) {
        const Folder = {
            Name : req.body.Name,
            desc : req.body.desc,
            cover:req.body.cover,
            parent : req.body.parent
        }
        db.collection('folders').updateOne({_id :ObjectId(req.params.id)},{$set:Folder}, (err, result) => {
            if (err) {console.log(err)
                return res.send('an Error Occured')}
            res.send(result)

        })
    })
    .put('/root/:id', function (req, res) {
        
        db.collection('folders').update({_id :ObjectId(req.params.id)},
        
            { $set: { parent: undefined } }
        , (err, result) => {
            if (err) {console.log(err)
                return res.send('an Error Occured')}
            res.send(result)

        })
    })
    
    

module.exports = router;