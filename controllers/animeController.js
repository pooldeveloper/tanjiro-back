const Anime = require('../models/Anime');
const multer = require('multer');

const configuracionMulter = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error());
        }
    },
}

const upload = multer(configuracionMulter).single('poster');

exports.newAnime = async (req, res) => {
    upload(req, res, async function (error) {
        try {
            const { name, idAnime , synopsis } = req.body;

            if (!name || !idAnime || !synopsis) {
                return res.status(400).json({ msg: 'Algunos campos son obligatorios' });
            }
            if (error) {
                return res.json({ msg: 'El formato del logo no es válido, use jpeg o png' })
            }
            if (!req.file) {
                return res.status(400).json({ msg: 'El poster es obligatorio' });
            }
            
            let anime = new Anime(req.body);
            anime.poster = req.file.buffer.toString('base64');
            await anime.save();
            res.json({ msg: 'Anime creado exitosamente' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Hubo un error' })
        }
    })
}

exports.getAnime = async (req, res) => {
    try {
        const anime = await Anime.findOne({ idAnime: req.params.idAnime });
        if (!anime) {
            return res.status(404).json({ msg: 'Anime no encontrado' });
        }
        res.json(anime);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

exports.newEpisode = async (req, res) => {
    try {
        const{ name, id, url } = req.body;
        if (!name || !id || !url) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        let anime = await Anime.findOne({ idAnime: req.params.idAnime });
        if (!anime) {
            return res.status(404).json({ msg: 'Anime no encontrado' });
        }
        
        anime.episodes.push(req.body);
        await Anime.findOneAndUpdate({ idAnime: req.params.idAnime}, anime, {new: true});
        res.json({ msg: 'Episodio agregado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

exports.getAnimes = async (req, res) => {
    try {
        const animes = await Anime.find();
        if (!animes) {
            return res.status(404).json({ msg: 'No hay animes' });
        }

        let infoAnimes = [];
        animes.forEach(({ name, idAnime, poster}) => {
            let anime = {};
            anime.name = name;
            anime.idAnime = idAnime
            anime.poster = poster
            infoAnimes.push(anime)
        });

        res.json(infoAnimes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}