import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, Observable, Subscription} from 'rxjs';
import {authActions} from '../../auth/store/auth.actions';
import {
  selectCurrentUser,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../auth/store/auth.reducers';
import {BackendErrorMessagesComponent} from '../../backend-error-messages/backend-error-messages.component';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {
  CurrentUser,
  CurrentUserRequest,
} from '../../shared/models/currentUser.interface';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  currentUser?: CurrentUser;
  currentUserSubscription?: Subscription;

  data$: Observable<{
    isSubmitting: boolean;
    validationErrors: BackendErrors | null;
  }> = new Observable();

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
  ) {
    this.settingsForm = this._fb.nonNullable.group({
      image: [''],
      username: ['', Validators.required],
      bio: [''],
      email: ['', Validators.required],
      password: [''],
    });

    this.data$ = combineLatest({
      isSubmitting: this._store.select(selectIsSubmitting),
      validationErrors: this._store.select(selectValidationErrors),
    });
  }

  ngOnInit() {
    this.currentUserSubscription = this._store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm() {
    if (!this.currentUser) {
      throw new Error('currentUser is not defined');
    }
    this.settingsForm.patchValue({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }

  logout() {
    this._store.dispatch(authActions.logout());
  }

  submitForm() {
    if (!this.currentUser) {
      throw new Error('currentUser is not defined');
    }
    const currentUserRequest: CurrentUserRequest = {
      user: {
        ...this.currentUser,
        ...this.settingsForm.getRawValue(),
      },
    };
    this._store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }

  ngOnDestroy() {
    this.currentUserSubscription?.unsubscribe();
  }
}
