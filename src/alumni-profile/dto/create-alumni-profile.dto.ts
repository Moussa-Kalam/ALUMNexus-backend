import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { EducationDto } from './education.dto';
import { CareerDto } from './career.dto';
import { ProjectDto } from './project.dto';
import { SkillDto } from './skill';
import { GcgoDto } from './gcgo';

export class CreateAlumniProfileDto {
  @IsOptional()
  @IsUrl()
  photo: string;

  @IsString()
  professionalTitle: string;

  @IsString()
  bio: string;

  @IsString()
  mission: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsUrl()
  linkedin: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsUrl()
  github?: string;

  @ValidateNested()
  education: EducationDto[];

  @ValidateNested()
  career: CareerDto[];

  @ValidateNested()
  projects: ProjectDto[];

  @ValidateNested()
  skills: SkillDto[];

  @ValidateNested()
  gcgos: GcgoDto[];
}
