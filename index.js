const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// Route 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
app.get('/', async (req, res) => {
    try {
        const customObjects = 'https://api.hubapi.com/crm/v3/objects/cities';
        const headers = {
            Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
            'Content-Type': 'application/json'
        };
        const resp = await axios.get(customObjects, { headers });
        const data = resp.data.results;

        console.log(data);
        res.render('homepage', { title: 'Custom Objects | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }
});

// Route 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot | Practicum' });
});
// Route 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.



// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
