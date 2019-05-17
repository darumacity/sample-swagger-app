'use strict';

const BaseEntity = require('./baseEntity');

class Entity extends BaseEntity {
  constructor(context) {
    super(context, 'invoiceDetails');
  }

  getMaxDetailId(invoiceId) {
    return this.context
      .query(`select coalesce(max("detailId"),0) as max from invoiceDetails where "invoiceId" = ${invoiceId}`)
      .then(([results, metadata]) => results[0]['max']);
  }
}

module.exports = (context) => { return new Entity(context); }
