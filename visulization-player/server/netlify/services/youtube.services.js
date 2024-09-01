// Search youtube information
const ytsr = require('ytsr');
const { getSubtitles } = require('youtube-captions-scraper');

module.exports.searchYouTube = async function(query) {
    try {
        // Search YouTube for the given query
        const searchResults = await ytsr(query, { limit: 20 });

        // Extract and display the video titles and links
        const result = searchResults.items.filter(item => item.type === 'video');
        return result;
    } catch (err) {
        console.error(err);
    }
}

module.exports.getLyrics = async function(videoId) {
    try {
        // Fetch subtitles
        const subtitles = await getSubtitles({
            videoID: videoId,
            lang: 'vi' || 'en', // You can specify language here, e.g., 'en' for English
        });

        // Check if subtitles are available
        if (subtitles.length === 0) {
            console.log(`No captions available for video ${videoId} in language ${lang}`);
            return null;
        }

        return subtitles;
    } catch (error) {
        console.error('Error fetching captions:', error);
    }
}