'use strict';

const Db = require('../db');

module.exports.list = (req, res) => (async () => {
  const db = new Db();
  var [results] = await db.invoices.get();

  res.json(results);
})();

module.exports.get = (req, res) => (async () => {
  var id = req.swagger.params.id.value;

  const db = new Db();
  var [results] = await db.invoices.get(id);

  res.json(results[0]);
})();

module.exports.post = (req, res) => (async () => {
  var body = req.swagger.params.body.value;
  
  const db = new Db();
  var [results] = await db.invoices.insert(body);

  res.json(results[0]);
})();

module.exports.put = (req, res) => (async () => {
  var id = req.swagger.params.id.value;
  var body = req.swagger.params.body.value;

  const db = new Db();
  var [results] = await db.invoices.update(id, body);

  res.json(results[0]);
})();

module.exports.delete = (req, res) => (async () => {
  var id = req.swagger.params.id.value;

  const db = new Db();
  await db.invoices.delete(id);

  res.json();
})();
