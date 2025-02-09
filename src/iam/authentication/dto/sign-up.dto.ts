import { UserRoles } from '../../../common/enums/roles.enum';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  @MinLength(6)
  @MaxLength(16)
  accountType: UserRoles;
}
