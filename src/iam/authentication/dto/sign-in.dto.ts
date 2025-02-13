import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @IsOptional()
  @IsNumberString()
  tfaCode?: string;
}
