'use strict';

module.exports.hello = (req, res) => {
  var name = req.swagger.params.name.value || 'stranger';
  var hello = `Hello, ${name}!`;

  res.json(hello);
}
