const express = require('express');
const app = express();
const allPosts = require('./posts.json');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
	 res.send(['userId', 'id', 'title', 'body']);
});
app.get('/posts', (req, res) => {
	return res.send(allPosts);
});
app.get('/posts/id:', (req, res) => {
	return res.send(req.params);
});
app.get('/userId/id/title/:body', (req, res) => {
	return res.send(req.params);
});

app.post('/posts', (req, res) => {
	console.log(req.body.newPost);

	allPosts.push(req.body.newPost);
	let stringedData = JSON.stringify(allPosts, null, 2);
	fs.writeFile('/posts.json', stringedData, function (err) {
		if (err) {
			return res.status(500).json({ message: err });
		}
	});
	return res.status(200).json({ message: 'new posts created' });
});

app.get('/posts/:id', (req, res) => {
	let id = req.params.id;
	let foundPost = allPosts.find((post) => {
		return String(post.id) === id;
	});
	if (foundPost) {
		return res.status(200).json({ post: foundPost });
	} else {
		res.status(404).json({ message: 'post not found' });
	}
});

app.put('/posts/:id', (req, res) => {
	let id = req.params.id;
	let foundPost = allPosts.find((post) => {
		return String(post.id) === id;
	});

	let updatedPost = req.body.updatedPost;
	console.log(updatedPost.title);
	console.log(updatedPost.body);

	foundPost.title = updatedPost.title;
	foundPost.body = updatedPost.body;

	for (let i = 0; i < allPosts.length; i++) {
		let currentPost = allPosts[i];
		if (currentPost.id == id) {
			allPosts[i] = foundPost;
		}
	}
	let stringedData = JSON.stringify(allPosts, null, 2);
	fs.writeFile('/posts.json', stringedData, function (err) {
		if (err) {
			return res.status(500).json({ message: err });
		}
	});
	return res.status(200).json({ message: 'Post has updated' });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
