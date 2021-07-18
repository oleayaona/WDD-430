var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Movie = require('../models/movie');

router.get('/', (req, res, next) => {
    Movie.find()
    .exec(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        return res.status(200).json(result);
    });
});

router.post('/', (req, res, next) => {
    const maxMovieId = sequenceGenerator.nextId("movies");

    const movie = new Movie({
        id: maxMovieId,
        title: req.body.title,
        year: req.body.year,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    });

    movie.save()
        .then(createdMovie => {
          console.log("NEW MOVIE:" + createdMovie)
            res.status(201).json({
                message: 'Movie added successfully',
                movie: createdMovie
            });
        })
        .catch(error => {
            res.status(500).json({
            message: 'Error creating Movie',
            error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Movie.findOne({ id: req.params.id })
      .then(movie => {
        console.log("Movie from req: " + req.body.title)
        movie.title = req.body.title,
        movie.year = req.body.year,
        movie.imageUrl = req.body.imageUrl,
        movie.description = req.body.description,
  
        Movie.updateOne({ id: req.params.id }, movie)
          .then(result => {
            res.status(204).json({
              message: 'Movie updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred while updating Movie',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Movie not found.',
          error: { Movie: 'Movie not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    Movie.findOne({ id: req.params.id })
      .then(Movie => {
        Movie.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Movie deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred while deleting Movie',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Movie not found.',
          error: { Movie: 'Movie not found'}
        });
      });
  });


module.exports = router; 