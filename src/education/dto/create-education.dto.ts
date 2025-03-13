import { IsString, IsNumber } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  degree: string;

  @IsString()
  specialization: string;

  @IsNumber()
  graduationYear: number;
}
