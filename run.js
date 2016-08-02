var express = require('express');
var app = express();
app.use(express.static('./examples'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});