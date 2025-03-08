import { IsString, IsUrl } from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  location: string;
  @IsUrl()
  link: string;
  @IsString()
  deadline: string;
}
