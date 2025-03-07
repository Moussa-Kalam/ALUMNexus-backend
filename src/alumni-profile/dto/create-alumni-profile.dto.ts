import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Skill } from '../../skills/entities/skill.entity';
import { EducationDto } from './education.dto';
import { CareerDto } from './career.dto';
import { ProjectDto } from './project.dto';

export class CreateAlumniProfileDto {
  @IsOptional()
  @IsUrl()
  photo: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  professionalTitle: string;

  @IsString()
  bio: string;

  @IsString()
  mission: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  linkedin: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @ValidateNested()
  education: EducationDto[];

  @ValidateNested()
  career: CareerDto[];

  @ValidateNested()
  projects: ProjectDto[];

  @ValidateNested()
  skills: Skill[];

  @IsString({ each: true })
  gcgos: string[];
}
