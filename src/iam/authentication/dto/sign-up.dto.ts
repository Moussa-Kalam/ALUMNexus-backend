import { UserRoles } from '../../../common/enums/roles.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  accountType: UserRoles;
}
