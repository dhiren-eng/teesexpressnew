const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWareAdm = require('../modules/middlewareAdm');


router.get('/api/admin/order/all', midWareAdm.checkToken, (req, res, next) => {
    db.getDB().collection('order').find().sort({orderDate: -1}).toArray((err, doc) => {
        if(err) {
            res.status(410).jsonp(err);
            next(err);
        } else {
            if(doc.length == 0)
                res.status(404).jsonp("No order placed yet!");
            else 
                res.status(200).jsonp(doc);
        }
    });
});

router.get('/api/admin/order/:id', (req, res, next) => {
    const collection = db.getDB().collection('order');
    collection.countDocuments({}, (cErr, cDoc) => {
        if(cErr) {
            res.status(410).jsonp(cErr);
            next(cErr);
        } else {
            if(cDoc == 0) {
                res.status(404).jsonp("Order not found!");
            } else {
                collection.findOne({_id: db.getPrimaryKey(req.params.id)}, (err, doc) => {
                    if(err) {        
                        res.status(410).jsonp(err);
                        next(err);
                    } else {
                        if(doc.length == 0)
                            res.status(404).jsonp("Order not found!");
                        else 
                            res.status(200).jsonp(doc);
                    }
                });
            }
        }
    })
});


router.post('/api/admin/order', midWareAdm.checkToken, (req, res, next) => {
    if(!req.body.orderType || !req.body.itemColor || !req.body.customerId) {
        res.status(400).jsonp('Incomplete information');
    } else {
        let ordInfo = {
            orderId: "ORD"+ new Date().getTime().toString(),
            qty: req.body.qty,
            category: req.body.category,
            itemColor: req.body.itemColor,
            size: req.body.size,
            orderType: req.body.orderType,
            designFile: req.body.designFile,
            customer: {
                cId: req.body.customerId,
                fullName: req.body.fullName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                pinCode: req.body.pin
            },
            advancePaid: req.body.advance,
            duePayment: req.body.due,
            orderDate: new Date().toString(),
            updatedOn: new Date().toString()
        }
        let dataCollect = db.getDB().collection('order');
        dataCollect.insertOne(ordInfo, (iErr, result) => {
            if(iErr) {
                res.status(410).jsonp(iErr);
                next(iErr);
            } else {
                res.status(201).jsonp("Order placed successfully!");
            }
        });
    }
});


router.put('/api/admin/order/:id', midWareAdm.checkToken, (req, res, next) => {
    if(!req.body.orderType || !req.body.itemColor) {
        res.status(400).jsonp('Incomplete information');
    } else {
        let ordInfo = {
            $set: {
                qty: req.body.qty,
                category: req.body.category,
                itemColor: req.body.itemColor,
                size: req.body.size,
                orderType: req.body.orderType,
                designFile: req.body.designFile,
                customer: {
                    cId: req.body.customerId,
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    email: req.body.email,
                    address: req.body.address,
                    pinCode: req.body.pin
                },
                advancePaid: req.body.advance,
                duePayment: req.body.due,
                updatedOn: new Date().toString()
            }
        }
        let dataCollect = db.getDB().collection('order');
        dataCollect.updateOne({_id: db.getPrimaryKey(req.params.id)}, ordInfo, (iErr, result) => {
            if(iErr) {
                res.status(410).jsonp(iErr);
                next(iErr);
            } else
                res.status(201).jsonp("Order updated successfully!");
        });
    }  
});



router.delete('/api/admin/order/:id', midWareAdm.checkToken, (req, res, next) => {
    db.getDB().collection('order').deleteOne({_id: db.getPrimaryKey(req.params.id)}, (err, doc) => {
        if(err) {
            res.status(410).jsonp(err);
            next();
        } else
            res.status(200).jsonp("Order delete successfully!");
    });
});



module.exports = router;