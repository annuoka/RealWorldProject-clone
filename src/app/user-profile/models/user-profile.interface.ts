export interface GetUserProfileResponse {
  profile: UserProfile;
}

export interface UserProfile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
