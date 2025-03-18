import { Sequelize } from 'sequelize';

export let conn : Sequelize;

/**
 * conn is a Sequelize object that represents a connection to the database
 */

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  conn = new Sequelize('postgres://app_db_user:webappgroup1gang@localhost:5432/app_db_user');
}

export async function initDB() {
  await conn.sync({alter: true, force: false});
}
