const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../modules/dbConnect');
const config = require('../modules/secret');

router.post('/api/register', (req, res, next) => {
  if (!req.body.usrEmail || !req.body.usrName || !req.body.yrPass) {
    res.status(400).jsonp('Incomplete information');
  } else {
    var BCRYPT_SALT_ROUNDS = 12;
    let regData = {
      logName: req.body.usrEmail,
      passCode: bcrypt.hashSync(req.body.yrPass, BCRYPT_SALT_ROUNDS),
      usrName: req.body.usrName,
      phone: req.body.phone,
      shippingAddress: req.body.address,
      regStatus: req.body.status,
      createdOn: new Date().toString(),
      updatedOn: new Date().toString(),
      accStatus: true,
    };

    const collection = db.getDB().collection('customer');

    collection.countDocuments({ logName: req.body.usrEmail }, (err, doc) => {
      if (err) {
        res.status(410).jsonp(err);
        next(err);
      } else {
        if (doc == 0) {
          collection.insertOne(regData, (err, result) => {
            if (err) {
              res.status(410).jsonp(err);
              next(err);
            } else {
              res.status(201).jsonp('Your are registered successfully...');
            }
          });
        } else {
          res
            .status(410)
            .jsonp(
              'Your email address already registered... Try different one!'
            );
        }
      }
    });
  }
});

router.get('/api/customer/:emailId', (req, res, next) => {
  const collection = db.getDB().collection('customer');
  collection.countDocuments({}, (cErr, cDoc) => {
    if (cErr) {
      res.status(410).jsonp(cErr);
      next(cErr);
    } else {
      if (cDoc == 0) {
        res.status(404).jsonp('Customer not found!');
      } else {
        console.log(req.params);
        console.log(req.params.usrName);
        collection.findOne({ logName: req.params.emailId }, (err, doc) => {
          if (err) {
            res.status(410).jsonp(err);
            next(err);
          } else {
            if (doc.length == 0) res.status(404).jsonp('Customer not found!');
            else res.status(200).jsonp(doc);
          }
        });
      }
    }
  });
});

router.put('/api/customer/:emailId', (req, res, next) => {
  let custInfo = {
    $set: {
      usrName: req.body.usrName,
      shippingAddress: req.body.shippingAddress,
      updatedOn: new Date().toString(),
    },
  };
  let dataCollect = db.getDB().collection('customer');
  dataCollect.updateOne(
    { logName: req.params.emailId },
    custInfo,
    (iErr, result) => {
      if (iErr) {
        res.status(410).jsonp(iErr);
        next(iErr);
      } else res.status(201).jsonp('Customer updated successfully!');
    }
  );
});

router.post('/api/login', (req, res, next) => {
  if (!req.body.usrName || !req.body.yrPass) {
    res.status(400).jsonp('Incomplete information');
  } else {
    db.getDB()
      .collection('customer')
      .findOne({ logName: req.body.usrName })
      .then((doc) => {
        if (doc) {
          if (doc.accStatus) {
            if (bcrypt.compareSync(req.body.yrPass, doc.passCode)) {
              let token = jwt.sign(
                { cId: doc._id, cName: doc.usrName, cEmail: doc.logName },
                config.secret
              );
              res.status(202).jsonp({
                usrInfo: doc,
                token: token,
              });
            } else res.status(401).jsonp('Authentication failed!');
          } else
            res.status(401).jsonp('Account suspended... Please contact admin!');
        } else res.status(401).jsonp('Authentication failed!');
      })
      .catch((err) => {
        res.status(410).jsonp(err);
        next(err);
      });
  }
});

module.exports = router;
