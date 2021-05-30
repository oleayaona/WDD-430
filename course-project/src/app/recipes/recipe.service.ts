import { EventEmitter, Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tomato Noodles', 
            'Easy noodles', 
            `https://www.maxpixel.net/static/photo/640/Italian-Tomato-Sauces-Noodles-Pasta-Spaghetti-4406130.jpg`,
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Tomato', 6)
            ]),
        new Recipe(
            'Italian Tiramisu', 
            'Yummy dessert!', 
            `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg/1200px-Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg`,
            [
                new Ingredient('Egg', 6),
                new Ingredient('Cream', 2)
            ])
      ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    // Adds ingredients to shopping list
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

}