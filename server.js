const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 6501



app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
});


// app.use(express.static(path.join(__dirname, 'build/index.html')));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.get('/index.html', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.get('/index.php', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.listen(PORT, () => {
  console.log("Server running in port"+ PORT)
})
