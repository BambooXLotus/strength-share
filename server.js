//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/app/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
