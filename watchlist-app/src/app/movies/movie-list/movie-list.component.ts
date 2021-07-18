import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  term: string;

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  // Gets search string from input
  search(value: string) {
    this.term = value;
  }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.subscription = this.movieService.movieListChangedEvent.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
