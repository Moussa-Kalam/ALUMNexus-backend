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
import { ActiveUser } from 'src/iam/decorators/active-user-decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { AlumniProfileService } from './alumni-profile.service';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';

@Controller('alumni-profile')
export class AlumniProfileController {
  constructor(private readonly alumniProfileService: AlumniProfileService) {}

  @Post()
  create(
    @Body() createAlumniProfileDto: CreateAlumniProfileDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.alumniProfileService.create(createAlumniProfileDto, activeUser);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.alumniProfileService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumniProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlumniProfileDto: UpdateAlumniProfileDto,
  ) {
    return this.alumniProfileService.update(id, updateAlumniProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumniProfileService.remove(id);
  }
}
