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

  async insert(values) {
    values.detailId = await this.getMaxDetailId(values.invoiceId) + 1;
    return await super.insert(values);
  }

  async recalc(invoiceId) {
    var [results] = await super.get({ invoiceId });
    var total = results.reduce((prev, current) => prev += current.unitPrice * current.quantity, 0);
    var tax = total * 0.08;

    return {
      amountWithoutTax: total,
      taxAmount: tax,
      amountIncludingTax: total + tax,
    }
  }
}

module.exports = (context) => { return new Entity(context); }
