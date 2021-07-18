import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieSelectedEvent = new EventEmitter<Movie>();
  movieListChangedEvent = new Subject<Movie[]>();
  maxMovieId: number;

  movies: Movie[] = [];

  constructor(private http: HttpClient) { 
    
  }

  getMovies(): Movie[] {
    this.http.get('http://localhost:3000/movies')
    .subscribe(
      (movies: Movie[]) => {
        this.movies = movies
        this.maxMovieId = this.getMaxId();
        this.movies.sort();
        this.movieListChangedEvent.next(this.movies.slice());
      }, 
      (error: any) => {
        console.log(error.message);
      }
    )
    return this.movies.slice();
  }

  getMovie(id: string): Movie {
    for (let movie of this.movies) {
      if (movie.id == id) {
        return movie;
      }
    }
  }

  getMaxId(): number {
    let maxId: number = 0;
  
    for (let movie of this.movies) {
      let currentId = +movie.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
    
  addMovie(newMovie: Movie) {
    console.log("New movie: " + newMovie.title);

    if (!newMovie) {
      return;
    }

    newMovie.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, movie: Movie }>('http://localhost:3000/movies',
    newMovie,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData.message);
        // add new document to documents
        this.movies.push(responseData.movie);
        this.movies.sort();
        this.movieListChangedEvent.next(this.movies.slice());
      }
    );
  }
  
  updateMovie(originalMovie: Movie, newMovie: Movie) {
    if (!originalMovie || !newMovie) {
        return;
      }
  
    let pos;

    this.movies.forEach((movie: Movie, index: number): void => {
      if (movie.id == newMovie.id) {
        pos = index;
      }
    });

    if (pos < 0) {
      return;
    }
  
    newMovie.id = originalMovie.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
   this.http.put('http://localhost:3000/movies/' + originalMovie.id,
   newMovie, { headers: headers })
   .subscribe(
     (response: Response) => {
       this.movies[pos] = newMovie;
       this.movies.sort();
       this.movieListChangedEvent.next(this.movies.slice());
     }
   );
  }
  
  deleteMovie(movie: Movie) { 
    if (!movie) {
      return;
   }
   const pos = this.movies.indexOf(movie);
   if (pos < 0) {
      return;
   }

   // delete from database
   this.http.delete('http://localhost:3000/movies/' + movie.id)
     .subscribe(
       (response: Response) => {
         this.movies.splice(pos, 1);
         this.movies.sort();
         this.movieListChangedEvent.next(this.movies.slice());
       }
     );

  }


}
