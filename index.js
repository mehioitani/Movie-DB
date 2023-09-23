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

app.listen(port);