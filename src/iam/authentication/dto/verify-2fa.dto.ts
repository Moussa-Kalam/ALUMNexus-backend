import { IsNumberString, IsString } from 'class-validator';

export class Verify2faDto {
  @IsString()
  @IsNumberString()
  tfaCode: string;
}
