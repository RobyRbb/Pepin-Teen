const students =  [{
    "id": 1,
    "name": "Tinela",
    "car": "Honda"
}, {
    "id": 2,
    "name": "Gescu",
    "car": "Lada"
}] 


const express = require('express');
const app = express();
//The body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET method
app.get('/', function(req, res) {
        res.send("Hello World");
    });
    app.get('/api/students', function(req, res) {
        res.send(students);
    });
    app.get('/api/students/:id', function(req, res) {
        res.send(students[req.params.id]);
    });

//POST method
app.post('/api/students', (req, res) => {
    var name = req.body.name;
        const student= {
            id: students.length + 1,
            name: name
        };
    students.push(student);
        res.send(students);
    });

//UPDATE method
app.put('/api/students/update/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var updatedStudent = req.body;
    if(students[id] != null){
        students[id] = updatedStudent;
    } else {
        res.status(404).send('Error!');
    }
    res.send(students);   
});

app.delete('/api/students/delete/:id', function(req, res) {
    var id = parseInt(req.params.id);
    if(students[id] != null){
        students.splice(id,1);
    } else {
        res.status(404).send('Error!');
    }
    res.send(students);   
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))