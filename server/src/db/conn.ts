import { Sequelize } from 'sequelize';

export let conn : Sequelize;

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  // user = app_db_user  
  // password = webappgroup1gang
  // database = app_db_user
  conn = new Sequelize('postgres://app_db_user:webappgroup1gang@localhost:5432/app_db_user');
}

export async function initDB() {
  await conn.sync({alter: true, force: false});
}
/*
sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error('Error: ', err));
    */