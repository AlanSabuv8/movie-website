const express = require('express')
const cors = require("cors")
const app = express()
const fs = require("fs"); 

app.use(cors());

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get('/api/movies', (req, res) => {
    fs.readFile("movies.json", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read movies data' });
        }
        const movies = JSON.parse(data);
        res.json({ movies });
    });
});

app.get('/api/movies/search', (req, res) => {
    const title = req.query.title.toLowerCase();
    fs.readFile("movies.json", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read movies data' });
        }
        const movies = JSON.parse(data);
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(title));
        res.json({ movies: filteredMovies });
    });
});

app.listen(5000, ()=> {console.log("server started on 5000")})