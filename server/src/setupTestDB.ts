import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

async function setupTestDB() {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `);

    await sequelize.query(`
        INSERT INTO users (username, email, password) VALUES
        ('testuser', 'user@gmail.com', 'password'),
        ('invalidowner', 'invalid@gmail.com', 'password');
    `);
}

export default setupTestDB;