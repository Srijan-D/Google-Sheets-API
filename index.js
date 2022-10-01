const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('index')
})
app.post('/', async (req, res) => {
    const { name, email } = req.body;
    //     //authenticatiing
    let auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets "
    })
    const client = await auth.getClient();
    //client is now authenticated here googles uses it to authorize client
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1HsU5W-sdtU5y4Wha_5c8X9L8pyEdtBgd7yaVzEXHjBA';
    //get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })
    //reading the sheets
    //to get the data present in the rows in the spreadsheet
    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet1!A:A',
    })

    //writing to the sheets
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Sheet1!C:D',
        valueInputOption: 'USER_ENTERED',
        //We can use RAW or USER_ENTERED this is used for parsing of the data sent
        //if We use RAW it is passed raw they dont change in any way
        //if we use USER_ENTERED it is parsed and converted to the format of the cell
        resource: {
            //array to store multiple values in rows at once
            values: [
                [name, email],
            ]
        }

    })

    res.send("Submitted successfully! :)")

})


//writing to docs via node:
// app.get('/', async (req, res) => {
//     //authenticatiing
//     let auth = new google.auth.GoogleAuth({
//         keyFile: "credentials.json",
//         scopes: "https://www.googleapis.com/auth/spreadsheets "
//     })
//     const client = await auth.getClient();
//     //client is now authenticated here googles uses it to authorize client 
//     const googleSheets = google.sheets({ version: 'v4', auth: client });
//     const spreadsheetId = '1HsU5W-sdtU5y4Wha_5c8X9L8pyEdtBgd7yaVzEXHjBA';
//     //get metadata about spreadsheet
//     const metaData = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId,
//     })
//     //reading the sheets
//     //to get the data present in the rows in the spreadsheet
//     const rows = await googleSheets.spreadsheets.values.get({
//         auth,
//         spreadsheetId,
//         range: 'Sheet1!A:A',
//     })

//     //writing to the sheets
//     await googleSheets.spreadsheets.values.append({
//         auth,
//         spreadsheetId,
//         range: 'Sheet1!C:D',
//         valueInputOption: 'USER_ENTERED',
//         //We can use RAW or USER_ENTERED this is used for parsing of the data sent
//         //if We use RAW it is passed raw they dont change in any way
//         //if we use USER_ENTERED it is parsed and converted to the format of the cell
//         resource: {
//             //array to store multiple values in rows at once
//             values: [
//                 ['Elys1an', 'million'],
//                 ['Elys1an 2', 'billion'],
//             ]
//         }

//     })

//     res.send(rows.data.values)
// })

app.listen({ port }, (req, res) => {
    console.log("server is running on port 3000")
})
