'use strict';

module.exports = class {
  constructor(name, age) {
    const Sequelize = require('sequelize');
    this.context = new Sequelize('sample', 'sample_user', 'password', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
  }

  get invoices() { return require('./invoices')(this.context); }
  get invoiceDetails() { return require('./invoiceDetails')(this.context); }
}
