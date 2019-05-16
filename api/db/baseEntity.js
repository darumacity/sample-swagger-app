'use strict';

module.exports = class {
  constructor(context, tableName, primaryKeyName) {
    this.context = context;
    this.tableName = tableName;
    this.primaryKeyName = primaryKeyName;
  }

  get(id) {
    var where = id !== undefined ? `where "${this.primaryKeyName}" = ${id}` : '';

    return this.context
      .query(`select * from ${this.tableName} ${where}`)
      .then(([results, metadata]) => [results, metadata]);
  }

  insert(values) {
    const joinedColumns = Object.keys(values).map(key => `"${key}"`).join(",");
    const joinedValues = Object.keys(values).map(key => `'${values[key]}'`).join(",");

    return this.context
      .query(`insert into ${this.tableName} (${joinedColumns}) values (${joinedValues}) returning *`)
      .then(result => result);
  }

  update(id, values) {
    const joinedValues = Object.keys(values).map(key => `"${key}"='${values[key]}'`).join(",");

    return this.context
      .query(`update ${this.tableName} set ${joinedValues} where "${this.primaryKeyName}" = ${id} returning *`)
      .then(result => result);
  }

  delete(id) {
    return this.context
      .query(`delete from ${this.tableName} where "${this.primaryKeyName}" = ${id}`)
      .then(result => result);
  }
}
