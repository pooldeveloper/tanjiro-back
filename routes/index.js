const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

module.exports = function () {
    router.post('/api/new-anime',
        animeController.newAnime
    );
    
    router.get('/api/animes/:idAnime',
        animeController.getAnime,
    );

    router.post('/api/new-episode/:idAnime',
        animeController.newEpisode,
    );

    router.get('/api/animes',
        animeController.getAnimes,
    );
    return router;
}