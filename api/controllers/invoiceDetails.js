'use strict';

const Db = require('../db');

module.exports.getInvoiceDetails = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;

  const db = new Db();
  var [results] = await db.invoiceDetails.get({ invoiceId });

  res.json(results);
})();

module.exports.getInvoiceDetail = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;
  var detailId = req.swagger.params.detailId.value;

  const db = new Db();
  var [results] = await db.invoiceDetails.get({ invoiceId, detailId });

  res.json(results[0]);
})();

module.exports.insertInvoiceDetail = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;
  var body = req.swagger.params.body.value;

  body.invoiceId = invoiceId;

  const db = new Db();
  body.detailId = await db.invoiceDetails.getMaxDetailId(invoiceId) + 1;
  var [results] = await db.invoiceDetails.insert(body);

  res.json(results[0]);
})();

module.exports.updateInvoiceDetail = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;
  var detailId = req.swagger.params.detailId.value;
  var body = req.swagger.params.body.value;

  const db = new Db();
  var [results] = await db.invoiceDetails.update({ invoiceId, detailId }, body);

  res.json(results[0]);
})();

module.exports.deleteInvoiceDetail = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;
  var detailId = req.swagger.params.detailId.value;

  const db = new Db();
  await db.invoiceDetails.delete({ invoiceId, detailId });

  res.json();
})();
