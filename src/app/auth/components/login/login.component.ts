import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {BackendErrorMessagesComponent} from '../../../backend-error-messages/backend-error-messages.component';
import {BackendErrors} from '../../../shared/models/backendErrors.interface';
import {LoginRequest} from '../../models/auth.models';
import {authActions} from '../../store/auth.actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  data$: Observable<{
    isSubmitting: boolean;
    validationErrors: BackendErrors | null;
  }> = new Observable();

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
  ) {
    this.loginForm = this._fb.nonNullable.group({
      email: ['', Validators.required /*, Validators.email*/],
      password: ['', Validators.required],
    });
    this.data$ = combineLatest({
      isSubmitting: this._store.select(selectIsSubmitting),
      validationErrors: this._store.select(selectValidationErrors),
    });
  }

  onSubmit(): void {
    const request: LoginRequest = {user: this.loginForm.getRawValue()};
    this._store.dispatch(authActions.login({request}));
  }
}
