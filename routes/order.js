const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');

router.get('/api/order/:emailId', (req, res, next) => {
  const collection = db.getDB().collection('order');
  collection.countDocuments(
    { 'customer.email': req.params.emailId },
    (cErr, cDoc) => {
      if (cErr) {
        res.status(410).jsonp(cErr);
        next(cErr);
      } else {
        if (cDoc == 0) {
          res.status(404).jsonp('No orders for this customer');
        } else {
          collection
            .find({ 'customer.email': req.params.emailId })
            .sort({ updateOn: -1 })
            .toArray((err, doc) => {
              if (err) {
                res.status(410).jsonp(err);
                next(err);
              } else {
                if (doc.length == 0)
                  res.status(404).jsonp('No orders for this customer');
                else res.status(200).jsonp(doc);
              }
            });
        }
      }
    }
  );
});

router.post('/api/order', (req, res, next) => {
  if (!req.body.items || !req.body.customerId) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let ordInfo = {
      orderId: 'ORD' + new Date().getTime().toString(),
      items: req.body.items,
      customer: {
        cId: req.body.customerId,
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        pinCode: req.body.pin,
      },
      totalPriceInfo: req.body.priceInfo,
      orderDate: new Date().toString(),
      updatedOn: new Date().toString(),
    };
    let dataCollect = db.getDB().collection('order');
    dataCollect.insertOne(ordInfo, (iErr, result) => {
      if (iErr) {
        res.status(410).jsonp(iErr);
        next(iErr);
      } else {
        res.status(201).jsonp('Order placed successfully!');
      }
    });
  }
});

router.put('/api/order/:id', (req, res, next) => {
  if (!req.body.items || !req.body.customerId) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let ordInfo = {
      $set: {
        items: req.body.items,
        customer: {
          cId: req.body.customerId,
          fullName: req.body.fullName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          pinCode: req.body.pin,
        },
        totalPriceInfo: req.body.priceInfo,
        updatedOn: new Date().toString(),
      },
    };
    let dataCollect = db.getDB().collection('order');
    dataCollect.updateOne(
      { _id: db.getPrimaryKey(req.params.id) },
      ordInfo,
      (iErr, result) => {
        if (iErr) {
          res.status(410).jsonp(iErr);
          next(iErr);
        } else res.status(200).jsonp('Order updated successfully!');
      }
    );
  }
});

router.post('/api/order/feedback/:id', midWare.checkToken, (req, res, next) => {
  if (!req.body.feedback) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let feedbInfo = {
      orderId: req.params.id,
      feedback: req.body.feedback,
      createdOn: new Date().toString(),
    };

    let dataCollect = db.getDB().collection('feedback');
    dataCollect.insertOne(feedbInfo, (iErr, result) => {
      if (iErr) {
        res.status(410).jsonp(iErr);
        next(iErr);
      } else res.status(201).jsonp('Feedback successfully!');
    });
  }
});

module.exports = router;
