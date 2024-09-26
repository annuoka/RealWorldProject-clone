import {CurrentUser} from '../../shared/models/currentUser.interface';

export interface RegisterRequest {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface AuthResponse {
  user: CurrentUser;
}
