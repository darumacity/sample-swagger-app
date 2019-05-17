'use strict';

const BaseEntity = require('./baseEntity');

class Entity extends BaseEntity {
  constructor(context) {
    super(context, 'invoices');
  }
}

module.exports = (context) => {return new Entity(context);}
