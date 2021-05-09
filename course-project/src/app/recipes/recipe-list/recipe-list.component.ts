import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Tomato Noodles', 'Easy noodles', `https://www.maxpixel.net/static/photo/640/
    Italian-Tomato-Sauces-Noodles-Pasta-Spaghetti-4406130.jpg`),
    new Recipe('Italian Pasta', 'Easy noodles', `https://www.maxpixel.net/static/photo/640/
    Italian-Tomato-Sauces-Noodles-Pasta-Spaghetti-4406130.jpg`)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
