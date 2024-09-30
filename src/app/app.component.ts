import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {authActions} from './auth/store/auth.actions';
import {TopBarComponent} from './shared/components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(authActions.getCurrentUser());
  }
}
