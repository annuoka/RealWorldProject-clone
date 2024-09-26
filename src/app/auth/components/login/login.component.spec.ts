import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {AuthService} from '../../auth.service';
import {authActions} from '../../store/auth.actions';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _store: Store;
  let _authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action with correct request', () => {
    const dispatchSpy = jest.spyOn(_store, 'dispatch');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      authActions.login({
        request: {user: {email: 'test@example.com', password: 'password123'}},
      }),
    );
  });

  it('should call authService login with correct request', () => {
    const mockCurrentUser = {
      email: 'test@example.com',
      token: 'token123',
      username: 'testuser',
      bio: 'Test bio',
      image: 'testimage.png',
    };
    const loginSpy = jest
      .spyOn(_authService, 'login')
      .mockReturnValue(of(mockCurrentUser));
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith({
      user: {email: 'test@example.com', password: 'password123'},
    });
  });

  it('should log response from authService login', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockCurrentUser = {
      email: 'test@example.com',
      token: 'token123',
      username: 'testuser',
      bio: 'Test bio',
      image: 'testimage.png',
    };
    jest.spyOn(_authService, 'login').mockReturnValue(of(mockCurrentUser));
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('response', mockCurrentUser);
  });

  it('should not dispatch login action if form is invalid', () => {
    const dispatchSpy = jest.spyOn(_store, 'dispatch');
    component.loginForm.setValue({email: '', password: ''});

    component.onSubmit();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
