import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '@ngrx/store';
import {async, Observable} from 'rxjs';
import {selectCurrentUser} from '../../../auth/store/auth.reducers';
import {CurrentUser} from '../../models/currentUser.interface';

@Component({
  selector: 'app-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent {
  @Input() tagName?: string;
  currentUser$: Observable<CurrentUser | null | undefined>;

  constructor(private _store: Store) {
    this.currentUser$ = this._store.select(selectCurrentUser);
    console.log(this.tagName);
  }

  protected readonly async = async;
}
