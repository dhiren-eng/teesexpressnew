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
      if (cDoc == 0) {
        res.status(404).jsonp('Cart is empty!');
      } else {
        collection.find({ customerId: req.params.id }).toArray((err, doc) => {
          if (err) {
            res.status(410).jsonp(err);
            next(err);
          } else {
            if (doc.length == 0) res.status(404).jsonp('Cart is empty!');
            else res.status(200).jsonp(doc);
          }
        });
      }
    }
  });
});

router.post('/api/cart', midWare.checkToken, (req, res, next) => {
  if (!req.body.id || !req.body.customerId) {
    res.status(400).jsonp('Incomplete information');
  } else {
    let dataCollect = db.getDB().collection('cart');
    let ordInfo = {
      itemId: req.body.id.toString(),
      cateName: req.body.cateName,
      color: req.body.color,
      orderName: req.body.orderName,
      printPerUnit: req.body.printPerUnit,
      printingOn: req.body.printingOn,
      sizes: req.body.sizes,
      totalPriceInfo: req.body.totalPriceInfo,
      totalQuantity: req.body.totalQuantity,
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
        printPerUnit: req.body.printPerUnit,
        printingOn: req.body.printingOn,
        sizes: req.body.sizes,
        totalPriceInfo: req.body.totalPriceInfo,
        totalQuantity: req.body.totalQuantity,
        updatedOn: new Date().toString(),
      },
    };

    let dataCollect = db.getDB().collection('cart');
    dataCollect.updateOne(
      { customerId: req.params.cId, itemId: req.body.id },
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

router.delete('/api/cart/:cId/:itemId', (req, res, next) => {
  console.log(req.params.cId);
  console.log(req.params.itemId);

  db.getDB()
    .collection('cart')
    .deleteOne(
      { customerId: req.params.cId, itemId: req.params.itemId },
      (err, doc) => {
        if (err) {
          res.status(410).jsonp(err);
          next();
        } else res.status(200).jsonp('Item delete successfully!');
      }
    );
});

module.exports = router;
