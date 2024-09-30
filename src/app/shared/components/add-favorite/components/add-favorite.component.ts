import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {addFavoriteActions} from '../store/add-favorite.actions';

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.scss',
})
export class AddFavoriteComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private _store: Store) {}

  handleLike() {
    this._store.dispatch(
      addFavoriteActions.addFavorite({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      }),
    );
    this.favoritesCount = this.isFavorited
      ? this.favoritesCount - 1
      : this.favoritesCount + 1;
    this.isFavorited = !this.isFavorited;
  }
}
