const express = require('express')
const app = express()
const port = 8000;

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/test', (req, res) => {
    const response = {
      status: 200,
      message: 'ok'
    };
  
    res.send(response);
  });

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

  app.get('/hello/:id?', (req, res) => {
    const { id } = req.params;
    const message = id ? `Hello ${id}` : 'Hello User';
    const response = {
        status:200,
        message:message
    }
    res.send(response);
  });


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

const movies = [ 

 { title: 'Jaws', year: 1975, rating: 8 },
 { title: 'Avatar', year: 2009, rating: 7.8 }, 
 { title: 'Brazil', year: 1985, rating: 8 }, 
 { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 } 
 
]

app.get('/movies/create', (req, res) => {
    const response = {
      status: 200,
      message: 'anyhting'
    };
  
    res.send(response);
  });

  app.get('/movies/read', (req, res) => {
    const response = {
      status: 200,
      data: movies
    };
    res.send(response);
  });

    app.get('/movies/read/by-date', (req, res) => { 
        const sortMovies = movies.sort((a,b) => a.year-b.year)
        const response = {
          status: 200,
          data: sortMovies
        };
    res.send(response);
  });

  app.get('/movies/read/by-rating', (req, res) => {
    const sortMovies = movies.sort((a, b) => b.rating - a.rating);
  
    const response = {
      status: 200,
      data: sortMovies
    };
  
    res.send(response);
  });

  app.get('/movies/read/by-title', (req, res) => {
    const sortMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
  
    const response = {
      status: 200,
      data: sortMovies
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
  

app.listen(port);