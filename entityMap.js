var sourceMap = {
    "cnn": "cnn",
    "espn": "espn",
    "fox news": "fox-news",
    "nbc": "nbc-news",
    "ars-technica": "ars-technica",
    "ars": "ars-technica",
    "ars technica": "ars-technica",
    "buzzfeed": "buzzfeed",
    "engadget": "engadget",
    "fortune": "fortune",
    "cbs news": "cbs-news",
    "cbs": "cbs-news"
};

var countryMap = {
    "england": "gb",
    "britain": "gb",
    "uk": "gb",
    "english": "gb",
    "france": "fr",
    "french": "fr",
    "germany": "de",
    "german": "de",
    "united states": "us",
    "america": "us",
    "us": "us",
    "usa": "us",
    "american": "us"
};

var categoryMap = {
    "general": "general",
    "health": "health",
    "science": "science",
    "sports": "sports",
    "technology": "technology",
    "tech": "technology",
    "entertainment": "entertainment",
    "movies": "entertainment",
    "movie": "entertainment",
    "business": "business"
};

module.exports = {
    country: countryMap,
    source: sourceMap,
    category: categoryMap
}