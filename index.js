const express = require('express');
const bodyParser = require('body-parser');
const { connect, createTable, createUser, getUsers, updateUser, deleteUser } = require('./db');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'views' directory
app.use(express.static(__dirname));

// Connect to database
connect()
  .then(() => console.log('Connected to database'))
  .catch(console.error);

// Routes
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email, phone, address } = req.body;
  await createUser(name, email, phone, address);
  res.send('User created');
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  await updateUser(id, name, email, phone, address);
  res.send('User updated');
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.send('User deleted');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
