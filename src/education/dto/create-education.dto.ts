import { IsNumber, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  degree: string;

  @IsString()
  specialization: string;

  @IsNumber()
  graduationYear: number;

  @IsString()
  institution: string;
}
