import { PartialType } from '@nestjs/mapped-types';
import { CreateGcgoDto } from './create-gcgo.dto';

export class UpdateGcgoDto extends PartialType(CreateGcgoDto) {}
