//declaring express

const express = require('express')
const app = express()
const port = 8080;
const mongoose = require('mongoose');

//step2
app.get('/', (req, res) => {
  res.send('ok')
})

// step 3
//when adding test next to local host port it will return "ok" message
app.get('/api/test', (req, res) => {
    const response = {
      status: 200,
      message: 'ok'
    };
  
    res.send(response);
  });

  //when adding time next to local host port it will return the current time
  app.get('/api/time', (req, res) => {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const seconds = timeNow.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    const response = {
      status: 200,
      message: time
    };
  
    res.send(response);
  });

  // Step 4
  //if ID value is entered it will return text Hello + ID else Hello user
  app.get('/api/hello/:id?', (req, res) => {
    const { id } = req.params;
    const message = id ? `Hello ${id}` : 'Hello User';
    const response = {
        status:200,
        message:message
    }
    res.send(response);
  });

// If a search value is entered  it will display its value in data section, if not it will throw an error and message "you have to provide a search"
app.get('/api/search', (req, res) => {
  const { s } = req.query;
  const response2 = {
    status: 500,
    error: true,
    message: 'You have to provide a search'
  };
  const data = s ? s : response2;

  const response = {
    status: s ? 200 : 500,
    message: s ? 'ok' : 'error',
    data: data
  };

  res.status(response.status).json(response);
});

//Step 5
//it includes an array of movies and 4 routes of Create,Read,Update and Delete
const movies = [ 

 { title: 'Jaws', year: 1975, rating: 8 , id:1},
 { title: 'Avatar', year: 2009, rating: 7.8, id:2 }, 
 { title: 'Brazil', year: 1985, rating: 8, id:3 }, 
 { title: 'الإرهاب والكباب', year: 1992, rating: 6.2, id:4 } 
 
]

app.get('/movies/create', (req, res) => {
    const response = {
      status: 200,
      message: 'anyhting'
    };
  
    res.send(response);
  });
//data = movies array with its values displayed
  app.get('/movies/read', (req, res) => {
    const response = {
      status: 200,
      data: movies
    };
    res.send(response);
  });

  app.get('/movies/update', (req, res) => {
    const response = {
      status: 200,
      message: 'anyhting'
    };
  
    res.send(response);
  });

  app.get('/movies/delete', (req, res) => {
    const response = {
      status: 200,
      message: 'anyhting'
    };
  
    res.send(response);
  });

// Step 6
//it will display movies values ordered by date
    app.get('/movies/read/by-date', (req, res) => { 
        const sortMovies = movies.sort((a,b) => a.year-b.year)
        const response = {
          status: 200,
          data: sortMovies
        };
    res.send(response);
  });

  //it will display movies values ordered by rating
  app.get('/movies/read/by-rating', (req, res) => {
    const sortMovies = movies.sort((a, b) => b.rating - a.rating);
  
    const response = {
      status: 200,
      data: sortMovies
    };
  
    res.send(response);
  });

//it will display movies values ordered by title
  app.get('/movies/read/by-title', (req, res) => {
    const sortMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
  
    const response = {
      status: 200,
      data: sortMovies
    };
  
    res.send(response);
  });

  //Step 7
  // When adding the id movie(added in the movies array) the movie properties will be displayed
  // If the ID entered is not available it will throw an error with a message of the provided ID Does not exist.
  app.get('/movies/read/id/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = movies[movieId-1];
  
    if (movie) {
      res.status(200).json({ status: 200, data: movie });
    } else {
      res.status(404).json({
        status: 404,
        error: true,
        message: `The movie ${movieId} does not exist`,
      });
    }
  });

//Step 8 
  
  app.get('/api/movies/add', (req, res) => {
    const { title, year, rating } = req.query;
  // if title and year are not provided it will throw an error with a message
    if (!title || !year) {
      return res.status(403).json({ status: 403, error: true, message: 'You cannot create a movie without providing a title and a year' });
    }
  // if year provided is not a number and it length are different from 4 digits it will throw an error with a message
    if (isNaN(year) || year.length !== 4) {
      return res.status(403).json({ status: 403, error: true, message: 'The year should be a 4-digit number' });
    }
// push to add the new movie to movies array list
    movies.push(title,year,rating || 4);
 // send the requested response 
    res.send({ movies });
  });
  

  //step 9
  app.get('/api/movies/delete/:id?', function(req, res) {
    //request the movie ID you want to delete as an integer
    const movieId = parseInt(req.params.id);
    //using the findIndex method to find the movie index of the movie relying on its ID
    const Index = movies.findIndex(movie => movie.id === movieId);
    // If the movie ID does not exist then error will pop with the Id entered (does not exist)
    if (Index === -1) {
      res.status(404).send({status: 404, error: true, message: `The movie ${movieId} does not exist`});
    } else {
    //  if the movie ID is found it will be delete it using the splice method in addition of a message and the list of the remaining movies.
      movies.splice(Index, 1);

      res.status(200).send({status: 200, error: false,movies: movies });
    }
 });

 // Step 10
 app.get("/api/movies/update/:id",(req,res) =>{

  const movieId = parseInt(req.params.id);
  const movieTitle = req.query.title;
  const movieYear = req.query.year;
  const movieRating = req.query.rating;

  const Index = movies.find(movie => movie.id === movieId);

  if (!Index){
     res.status(404).send({status: 404, error: true, message: `The movie ${movieId} does not exist`});

  }if(movieTitle){
     Index.title = movieTitle

  }if(movieYear){
     Index.year = movieYear

  }if(movieRating){
     Index.rating = movieRating
  }
     res.status(200).send({status: 200, error: false, movies: movies});
});
  
  // connect to DB
  mongoose.connect('mongodb+srv://muhieddineitani04:Mehio70934493@mehio.owilamh.mongodb.net/Mehio?retryWrites=true&w=majority')
    .then(()=>{
      app.listen(port,()=>{
        console.log('Connected To MongoDB')
        console.log('App is listening on port 8080')
      })

    })
    .catch((error)=>{
        console.log(error)
    })

