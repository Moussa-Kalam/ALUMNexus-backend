import { IsString, IsDateString } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  role: string;

  @IsString()
  company: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  location: string;
}
