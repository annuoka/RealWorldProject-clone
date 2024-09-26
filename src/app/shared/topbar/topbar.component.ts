import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {selectCurrentUser} from '../../auth/store/auth.reducers';
import {CurrentUser} from '../models/currentUser.interface';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  data$: Observable<{currentUser: CurrentUser | null | undefined}> =
    new Observable();

  constructor(private _store: Store) {
    this.data$ = combineLatest({
      currentUser: this._store.select(selectCurrentUser),
    });
  }
}
