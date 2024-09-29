import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {BackendErrorMessagesComponent} from '../../../backend-error-messages/backend-error-messages.component';
import {BackendErrors} from '../../../shared/models/backendErrors.interface';
import {AuthService} from '../../services/auth.service';
import {RegisterRequest} from '../../models/auth.models';
import {authActions} from '../../store/auth.actions';
import {
  AuthState,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducers';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  data$: Observable<Partial<AuthState>> = new Observable();
  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) {
    this.registerForm = this._fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
    this.data$ = combineLatest({
      isSubmitting: this._store.select(selectIsSubmitting),
      validationErrors: this._store.select(selectValidationErrors),
    });
  }

  onSubmit(): void {
    console.log('Registering...', this.registerForm.getRawValue());
    const request: RegisterRequest = {user: this.registerForm.getRawValue()};
    this._store.dispatch(authActions.register({request}));
    this._authService.register(request).subscribe((response) => {
      console.log('response', response);
    });
  }
}
