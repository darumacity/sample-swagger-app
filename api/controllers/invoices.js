'use strict';

module.exports.list = (req, res) => {
  res.json([
    {
      "invoiceId": 1,
      "amountWithoutTax": 1,
      "taxAmount": 1,
      "amountIncludingTax": 1
    }
  ]);
}

module.exports.get = (req, res) => {
  var id = req.swagger.params.id.value;

  res.json({
    "invoiceId": id,
    "amountWithoutTax": 1,
    "taxAmount": 1,
    "amountIncludingTax": 1
  });
}

module.exports.post = (req, res) => {
  res.json({
    "invoiceId": 1,
    "amountWithoutTax": 1,
    "taxAmount": 1,
    "amountIncludingTax": 1
  });
}

module.exports.put = (req, res) => {
  var id = req.swagger.params.id.value;

  res.json({
    "invoiceId": id,
    "amountWithoutTax": 1,
    "taxAmount": 1,
    "amountIncludingTax": 1
  });
}

module.exports.delete = (req, res) => {
  var id = req.swagger.params.id.value;

  res.json();
}
