const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/strength-share'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/strength-share/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
