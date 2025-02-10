import { UserRoles } from '../../common/enums/roles.enum';

export interface ActiveUserData {
  /**
   * The "subject" of the token, in our case the user ID
   * that granted the token
   */
  sub: string;

  /**
   * The subject's (user) email
   */
  email: string;

  accountType: UserRoles;
}
