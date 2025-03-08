import { IsString } from 'class-validator';

export class SkillDto {
  @IsString()
  name: string;
}
