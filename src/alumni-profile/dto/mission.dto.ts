import { IsString } from 'class-validator';

export class MissionDto {
  @IsString()
  description: string;
}
