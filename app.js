const express = require('express');
const fs = require('fs/promises');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/users', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    res.status(201).json(users)
})
app.post('/users/', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const newUser = req.body;
    users.push({...newUser, id: users[users.length - 1].id + 1})

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));
    res.status(201).json("created");
    console.log(users);
})
app.get('/users/:userId', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const {userId} = req.params;
    const user = users.find((user) => user.id === +userId);

    res.status(201).json(user);
    console.log(user);
})
app.put('/users/:userId', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const {userId} = req.params;
    const newUserInfo = req.body;

    const index = users.findIndex((user) => user.id === +userId);


    users[index] = {...users[index], ...newUserInfo};
    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));
    res.json("Updated");
    console.log(users);
})
app.delete('/users/:userId', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const {userId} = req.params;

    const index = users.findIndex(user => user.id === +userId)

    users.splice(index, 1);

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));
    res.sendStatus(204);
})

app.listen(5001, () => {
    console.log("server listen port 5001");
})
