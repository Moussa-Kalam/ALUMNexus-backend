import { IsNumber, IsString } from 'class-validator';

export class EducationDto {
  @IsString()
  degree: string;

  @IsString()
  specialization: string;

  @IsNumber()
  graduationYear: number;
}
