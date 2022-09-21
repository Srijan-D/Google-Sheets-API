const express = require('express');

const { google } = require('googleapis');


const app = express();

const port = 3000;
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("working")
})

app.post('/', (req, res) => {
    let auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets "
    })
})
async function(auth) {
    const sheets = google.sheets({ version: 'v4', auth })
 
}


app.listen({ port }, (req, res) => {
    console.log("server is running on port 3000")
})
