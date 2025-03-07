import { IsString } from 'class-validator';

export class CreateMissionDto {
  @IsString()
  description: string;
}
