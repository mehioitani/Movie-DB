//declaring express

const express = require('express')
const app = express()
const port = 8000;
// const mongoose = require('mongoose');

//step2
app.get('/', (req, res) => {
  res.send('ok')
})

// step 3
//when adding test next to local host port it will return "ok" message
app.get('/test', (req, res) => {
    const response = {
      status: 200,
      message: 'ok'
    };
  
    res.send(response);
  });

  //when adding time next to local host port it will return the current time
  app.get('/time', (req, res) => {
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
  app.get('/hello/:id?', (req, res) => {
    const { id } = req.params;
    const message = id ? `Hello ${id}` : 'Hello User';
    const response = {
        status:200,
        message:message
    }
    res.send(response);
  });

// If a search value is entered  it will display its value in data section, if not it will throw an error and message "you have to provide a search"
app.get('/search', (req, res) => {
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

  
  // connect to DB
  // mongoose.connect(process.env.MONGO_URI)
  //   .then(()=>{
  //       app.listen(process.env.PORT,()=>{
  //           console.log('listening on port',process.env.PORT)
  //       });
  //   })
  //   .catch((error)=>{
  //       console.log(error)
  //   })

app.listen(port)