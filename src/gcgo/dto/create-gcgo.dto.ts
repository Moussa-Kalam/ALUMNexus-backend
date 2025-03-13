import { IsString } from 'class-validator';

export class CreateGcgoDto {
  @IsString()
  name: string;
}
