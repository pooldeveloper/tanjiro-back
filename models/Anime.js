const mongoose = require('mongoose');

const AnimeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  idAnime: {
    type: String,
    required: true,
    trim: true,
  },
  synopsis:{
    type: String,
    required: true,
    trim: true
  },
  nextEpisode: {
    type: String,
    trim: true
  },
  numberEpisodes: {
    type: String,
    trim: true
  },
  episodes: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
      url: { type: String, required: true },
    }
  ],
  poster: {
    type: String
  },
  registration: {
    type: Date,
    default: Date.now()
  },
})

module.exports = mongoose.model('Anime', AnimeSchema);
