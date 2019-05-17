'use strict';

const Db = require('../db');

module.exports.getInvoices = (req, res) => (async () => {
  const db = new Db();
  var [results] = await db.invoices.get();

  res.json(results);
})();

module.exports.getInvoice = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;

  const db = new Db();
  var [results] = await db.invoices.get({ invoiceId });

  res.json(results[0]);
})();

module.exports.insertInvoice = (req, res) => (async () => {
  var body = req.swagger.params.body.value;

  const db = new Db();
  var [results] = await db.invoices.insert(body);

  res.json(results[0]);
})();

module.exports.updateInvoice = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;
  var body = req.swagger.params.body.value;

  const db = new Db();
  var [results] = await db.invoices.update({ invoiceId }, body);

  res.json(results[0]);
})();

module.exports.deleteInvoice = (req, res) => (async () => {
  var invoiceId = req.swagger.params.invoiceId.value;

  const db = new Db();
  await db.invoices.delete({ invoiceId });

  res.json();
})();
