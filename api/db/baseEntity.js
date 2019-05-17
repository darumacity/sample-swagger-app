'use strict';

module.exports = class {
  constructor(context, tableName) {
    this.context = context;
    this.tableName = tableName;
  }

  get(conditions = {}) {
    const joinedConditions = Object.keys(conditions).map(key => `and "${key}"='${conditions[key]}'`).join(' ');

    return this.context
      .query(`select * from ${this.tableName} where 1=1 ${joinedConditions}`)
      .then(([results, metadata]) => [results, metadata]);
  }

  insert(values) {
    const joinedColumns = Object.keys(values).map(key => `"${key}"`).join(",");
    const joinedValues = Object.keys(values).map(key => `'${values[key]}'`).join(",");

    return this.context
      .query(`insert into ${this.tableName} (${joinedColumns}) values (${joinedValues}) returning *`)
      .then(result => result);
  }

  update(conditions, values) {
    const joinedConditions = Object.keys(conditions).map(key => `and "${key}"='${conditions[key]}'`).join(' ');
    const joinedValues = Object.keys(values).map(key => `"${key}"='${values[key]}'`).join(",");

    return this.context
      .query(`update ${this.tableName} set ${joinedValues} where 1=1 ${joinedConditions} returning *`)
      .then(result => result);
  }

  delete(conditions) {
    const joinedConditions = Object.keys(conditions).map(key => `and "${key}"='${conditions[key]}'`).join(' ');

    return this.context
      .query(`delete from ${this.tableName} where 1=1 ${joinedConditions}`)
      .then(result => result);
  }
}
