import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumniProfileDto } from './create-alumni-profile.dto';

export class UpdateAlumniProfileDto extends PartialType(CreateAlumniProfileDto) {}
