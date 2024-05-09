const sql = require('mssql');

const config = {
  user: 'guest29',
  password: 'P@ssword29',
  server: 'azsqlserver29.database.windows.net',
  database: 'az_sql_db',
  options: {
    encrypt: true, // For Azure SQL Server
    trustServerCertificate: true // For Azure SQL Server
  }
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
}

module.exports = {
  connect,
  sql
};

async function createTable() {
  try {
    await sql.query(`
      CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50),
        email NVARCHAR(50),
        phone NVARCHAR(20),
        address NVARCHAR(100)
      );
    `);
    console.log('Table created');
  } catch (err) {
    console.error('Error creating table: ', err);
  }
}

module.exports = {
  connect,
  createTable,
  sql
};

async function createUser(name, email, phone, address) {
  try {
    const result = await sql.query`
      INSERT INTO Users (name, email, phone, address)
      VALUES (${name}, ${email}, ${phone}, ${address});
    `;
    console.log('User created');
    return result;
  } catch (err) {
    console.error('Error creating user: ', err);
  }
}

async function getUsers() {
  try {
    const result = await sql.query`SELECT * FROM Users`;
    return result.recordset;
  } catch (err) {
    console.error('Error fetching users: ', err);
  }
}

async function updateUser(id, name, email, phone, address) {
  try {
    const result = await sql.query`
      UPDATE Users
      SET name = ${name}, email = ${email}, phone = ${phone}, address = ${address}
      WHERE id = ${id};
    `;
    console.log('User updated');
    return result;
  } catch (err) {
    console.error('Error updating user: ', err);
  }
}

async function deleteUser(id) {
  try {
    const result = await sql.query`
      DELETE FROM Users
      WHERE id = ${id};
    `;
    console.log('User deleted');
    return result;
  } catch (err) {
    console.error('Error deleting user: ', err);
  }
}

module.exports = {
  connect,
  createTable,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  sql
};

