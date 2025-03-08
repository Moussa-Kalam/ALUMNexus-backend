import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
