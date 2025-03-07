import { IsString, IsUrl } from 'class-validator';

export class ProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  projectLink: string;
}
