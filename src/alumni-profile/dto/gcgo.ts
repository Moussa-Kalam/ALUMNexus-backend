import { IsString } from 'class-validator';

export class GcgoDto {
  @IsString()
  name: string;
}
