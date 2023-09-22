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

app.listen(port);