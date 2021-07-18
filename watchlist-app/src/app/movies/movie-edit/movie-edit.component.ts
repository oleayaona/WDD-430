import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  originalMovie: Movie;
  movie: Movie;
  editMode: boolean = false;
  id: string;
  movieInvalid: boolean = false;
  movies: Movie[] = [];
  
  constructor(
      private movieService: MovieService,
      private router: Router,
      private route: ActivatedRoute) {
      }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalMovie = this.movieService.getMovie(this.id.toString());

          if (!this.originalMovie) {
            return;
          }

          this.editMode = true;
          this.movie = JSON.parse(JSON.stringify(this.originalMovie));
          this.movies = this.movieService.getMovies()
        }
      )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newMovie = new Movie(this.movieService.getMaxId().toString(), value.title, value.year, value.imageUrl, value.description);

    if (this.editMode) {
      this.movieService.updateMovie(this.originalMovie, newMovie)
    } else {
      this.movieService.addMovie(newMovie);
    }

    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/movies']);
  }

  // Checks if a movie is already saved
  isInvalidMovie(newMovie: Movie) {
    if (!newMovie) {
      this.movieInvalid = true;
      return true;
    }

    if (this.movie && newMovie.id === this.movie.id) {
      this.movieInvalid = true;
       return true;
    }

    for (let i = 0; i < this.movies.length; i++){
       if (newMovie.id === this.movies[i].id) {
        this.movieInvalid = true;
        return true;
      }
    }

    this.movieInvalid = false;
    return false;
 }

}
