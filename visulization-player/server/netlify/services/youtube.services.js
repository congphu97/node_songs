// Search youtube information
const ytsr = require('ytsr');

module.exports.searchYouTube = async function(query) {
    try {
        // Search YouTube for the given query
        const searchResults = await ytsr(query, { limit: 10 });

        // Extract and display the video titles and links
        const result = searchResults.items.filter(item => item.type === 'video');
        return result;
    } catch (err) {
        console.error(err);
    }
}
