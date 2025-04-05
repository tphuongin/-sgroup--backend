
import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.json());

const dataFilePath = 'data.txt'; 

let users = [];

if (fs.existsSync(dataFilePath)) {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        console.error('Read file error:', err);
    }
}


app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {
  try{
    const userId = parseInt(req.params.id, 10);
    if(isNaN(userId)){
      return res.status(400).json({error: 'Invalid user ID'});
    }
    let user = users.find(u => u.id == userId);
    if(user){
      res.json(user);
    }
    else{
      return res.status(404).json({error: 'User not found'});
    }
  } catch(err){
    res.status(500).json({error: 'Internal server error'});
  }
})

app.post('/user', (req, res) => {
    try {
        const userInfor = req.body;
        if (!userInfor.name || !userInfor.age) {
            return res.status(400).json({ error: 'Invalid data. Name and age are required.' });
        }

        let newId = 1;
        if (users.length > 0) {
            newId = Number(users[users.length - 1].id) + 1;
        }
        const newUser = {id: newId, name: userInfor.name, age: userInfor.age}
        users.push(newUser);
        fs.writeFileSync(dataFilePath, JSON.stringify(users), 'utf8'); 
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/user/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const index = users.findIndex((u) => u.id === userId);

        if (index !== -1) {
            users.splice(index, 1);
            fs.writeFileSync(dataFilePath, JSON.stringify(users), 'utf8'); 
            res.status(204).send();
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/user/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const indexUpdate = users.findIndex((u) => u.id === userId);

        if (indexUpdate !== -1) {
          const updateU = req.body;
          if(!updateU.name && !updateU.age){
              return res.status(400).json({error: "Invalid input. name or age is required"})
          }
          if (updateU.name) {
              users[indexUpdate].name = updateU.name;
          }
          if (updateU.age) {
              users[indexUpdate].age = updateU.age;
          }
          res.json(users[indexUpdate]);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});