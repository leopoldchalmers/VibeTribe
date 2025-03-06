import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('postgres://app-db-user:webappgroup1gang@localhost:5432/app_db_user');

export let conn : Sequelize;

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  conn = new Sequelize('postgres://app-db-user:webappgroup1gang@localhost:5432/app_db_user');
}

export async function initDB() {
  await conn.sync({alter: true, force: false});
}
/*
sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error('Error: ', err));
    */