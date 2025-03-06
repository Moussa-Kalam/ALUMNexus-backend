import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AlumniProfileService } from './alumni-profile.service';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('alumni-profile')
export class AlumniProfileController {
  constructor(private readonly alumniProfileService: AlumniProfileService) {}

  @Post()
  create(@Body() createAlumniProfileDto: CreateAlumniProfileDto) {
    return this.alumniProfileService.create(createAlumniProfileDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.alumniProfileService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumniProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlumniProfileDto: UpdateAlumniProfileDto,
  ) {
    return this.alumniProfileService.update(+id, updateAlumniProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumniProfileService.remove(+id);
  }
}
