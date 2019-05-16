'use strict';

const BaseEntity = require('./baseEntity');

module.exports = class extends BaseEntity {
  constructor(context) {
    super(context, 'invoices', 'invoiceId');
  }
}
