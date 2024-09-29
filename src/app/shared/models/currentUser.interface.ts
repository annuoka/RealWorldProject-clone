export interface CurrentUserRequest {
  user: CurrentUser & {password: string};
}
export interface CurrentUser {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}
