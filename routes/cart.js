const express = require('express');
const router = express.Router();
const db = require('../modules/dbConnect');
const midWare = require('../modules/middleware');

router.get('/api/cart/:id', (req, res, next) => {
  console.log('hi');
  const collection = db.getDB().collection('cart');

  collection.countDocuments({ customerId: req.params.id }, (cErr, cDoc) => {
    if (cErr) {
      res.status(410).jsonp(cErr);
      next(cErr);
    } else {
      collection.find({ customerId: req.params.id }).toArray((err, doc) => {
        if (err) {
          res.status(410).jsonp(err);
          next(err);
        } else {
          res.status(200).jsonp(doc);
        }
      });
    }
  });
});

router.post('/api/cart', midWare.checkToken, (req, res, next) => {
  if (!req.body.id || !req.body.customerId) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let dataCollect = db.getDB().collection('cart');
    let ordInfo = {
      id: req.body.id.toString(),
      cateName: req.body.cateName,
      color: req.body.color,
      orderName: req.body.orderName,
      pricePerUnit: req.body.pricePerUnit,
      printingOn: req.body.printingOn,
      sizes: req.body.sizes,
      totalPriceInfo: req.body.totalPriceInfo,
      totalQuantity: req.body.totalQuantity,
      url: req.body.url,
      originalPricePerUnit: req.body.originalPricePerUnit,
      customerId: req.body.customerId,
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
    };

    dataCollect.insertOne(ordInfo, (iErr, result) => {
      if (iErr) {
        res.status(410).jsonp(iErr);
        console.log(iErr);
        next(iErr);
      } else {
        res.status(201).jsonp('Item on the cart!');
      }
    });
  }
});

router.put('/api/cart/:cId', midWare.checkToken, (req, res, next) => {
  if (!req.body.id) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let ordInfo = {
      $set: {
        cateName: req.body.cateName,
        color: req.body.color,
        orderName: req.body.orderName,
        pricePerUnit: req.body.pricePerUnit,
        printingOn: req.body.printingOn,
        sizes: req.body.sizes,
        totalPriceInfo: req.body.totalPriceInfo,
        totalQuantity: req.body.totalQuantity,
        url: req.body.url,
        originalPricePerUnit: req.body.originalPricePerUnit,
        updatedOn: new Date().toString(),
      },
    };

    let dataCollect = db.getDB().collection('cart');
    dataCollect.updateOne(
      { customerId: req.params.cId, id: req.body.id },
      ordInfo,
      (iErr, result) => {
        if (iErr) {
          res.status(410).jsonp(iErr);
          next(iErr);
        } else {
          res.status(201).jsonp('Cart item updated successfully!');
        }
      }
    );
  }
});

router.delete('/api/cart/:cId/:id', (req, res, next) => {
  db.getDB()
    .collection('cart')
    .deleteOne(
      { customerId: req.params.cId, id: req.params.id },
      (err, doc) => {
        if (err) {
          res.status(410).jsonp(err);
          next();
        } else res.status(200).jsonp('Item delete successfully!');
      }
    );
});

module.exports = router;
