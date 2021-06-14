import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Using references
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;

  // Using event emitters
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('form') editForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedIngredient = this.shoppingListService.getIngredient(index);
          this.editForm.setValue(
            {
              name: this.editedIngredient.name,
              amount: this.editedIngredient.amount
            }
          )
        }
      );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset()
  }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
