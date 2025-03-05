import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('postgres://app_db_user:Comando45@localhost:5432/');

export let conn : Sequelize;

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  conn = new Sequelize('postgres://app_db_user:Commando450@localhost:5432/');
}

export async function initDB() {
  await conn.sync({alter: true, force: false});
}
/*
sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error('Error: ', err));
    */