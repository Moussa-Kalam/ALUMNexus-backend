import { IsDateString, IsString } from 'class-validator';

export class CareerDto {
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
