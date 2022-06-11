//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angular-learning-project'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/angular-learning-project/'}),
// );

console.log("running server file");

app.get('*', (req, res) => {
    res.sendFile(__dirname+`/dist/angular-learning-project/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});




// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);