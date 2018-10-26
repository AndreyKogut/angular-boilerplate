import { User } from './user';

export namespace Authentication {
  import UserProfile = User.UserProfile;

  export interface LoginFormData {
    username: string;
    password: string;
  }

  export interface RegistrationFormData extends LoginFormData {
    firstName: string;
    lastName: string;
  }

  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    profile: UserProfile;
  }
}
