const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'scraped_data';

let db;
// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        console.log('Connected to MongoDB');
        db = client.db(DATABASE_NAME);
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));
    

// Function to extract data from the webpage
const scrapeWebsite = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const name = $('title').text() || ''; // Title of the page
        const description = $('meta[name="description"]').attr('content') || '';
        const companyLogo = $('link[rel="icon"]').attr('href') || '';
        const facebook = $('a[href*="facebook.com"]').attr('href') || '';
        const linkedin = $('a[href*="linkedin.com"]').attr('href') || '';
        const twitter = $('a[href*="twitter.com"]').attr('href') || '';
        const instagram = $('a[href*="instagram.com"]').attr('href') || '';
        const address = $('address').text() || '';
        const phone = $('a[href^="tel:"]').text() || '';
        const email = $('a[href^="mailto:"]').text() || '';

        return {
            name,
            description,
            companyLogo,
            facebook,
            linkedin,
            twitter,
            instagram,
            address,
            phone,
            email,
            url,
            scrapedAt: new Date(),
        };
    } catch (error) {
        console.error('Error scraping website:', error.message);
        return { error: 'Unable to scrape the website.' };
    }
};

// API endpoint to scrape a website
app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const data = await scrapeWebsite(url);

    if (data.error) {
        return res.status(500).json(data);
    }

    try {
        const result = await db.collection('websites').insertOne(data);
        console.log('Data saved to MongoDB:', result.insertedId);
        res.json({ success: true, id: result.insertedId, data });
    } catch (error) {
        console.error('Error saving to MongoDB:', error.message);
        res.status(500).json({ error: 'Failed to save data to the database.' });
    }
});

// Endpoint to fetch all website data
app.get('/api/websites', async (req, res) => {
    try {
        const websites = await db.collection('websites').find().toArray();
        res.status(200).json(websites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch website data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
