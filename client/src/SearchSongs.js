const axios = require('axios');
const cheerio = require('cheerio');

const searchSongs = async (searchTerm) => {
    try {
        // Construct the search URL
        const searchUrl = `https://www.tab4u.com/resultsSimple?tab=songs&q=${encodeURIComponent(searchTerm)}`;
        const { data } = await axios.get(searchUrl);
        
        const $ = cheerio.load(data);

        const songs = [];
        
        // Update the selector for the song items
        $('.song-item').each((i, element) => { // Adjust based on actual HTML structure
            const title = $(element).find('.title').text().trim(); // Selector for song title
            const artist = $(element).find('.artist').text().trim(); // Selector for artist name
            const image = $(element).find('img').attr('src'); // Assuming there is an image for the song

            if (title && artist) {
                songs.push({ title, artist, image });
            }
        });

        return songs;
    } catch (error) {
        console.error(`Error fetching search results: ${error.message}`);
        return [];
    }
};

module.exports = searchSongs;
