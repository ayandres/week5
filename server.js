const express = require('express');
const app = express();
const port = 3000;
const posts = require('./posts.json');

app.use(express.json());

// app.get('/', (req, res) => {
// 	res.send('root');
// });

app.get('/', function (req, res) {
	res.json(req.body);
});

//create new post
// let newPost = {
// 	userId: '',
// 	id: '',
// 	title: '',
// 	body: '',
// };

app.get('/posts') =>
arr
app.post('/posts', function (req, res) {
	res.json();
});

app.post('/posts/:id', function (req, res) {
	res.json();
});
app.put('/posts/:id', function (req, res) {
	res.send('updated single user');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
