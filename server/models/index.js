'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//sequelize 객체 선언시 매개변수로 "DB명, 사용자, 비번, 설정정보 전체" 정보를 받음

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db = {"sequelize" : sequelize, "sequelize": sequelize}

db.Todo = require('./Todo')(sequelize, Sequelize);
//db = {"sequelize" : sequelize, "sequelize": sequelize, "Todo":model}
//여기있는 model은 model: models/Todo.js에서 Todo가 반환하고 있는 model이 된다

module.exports = db;
//db객체를 내보냄
