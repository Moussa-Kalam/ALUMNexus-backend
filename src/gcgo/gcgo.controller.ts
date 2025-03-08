import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGcgoDto } from './dto/create-gcgo.dto';
import { UpdateGcgoDto } from './dto/update-gcgo.dto';
import { GcgoService } from './gcgo.service';

@Controller('gcgo')
export class GcgoController {
  constructor(private readonly gcgoService: GcgoService) {}

  @Post()
  create(@Body() createGcgoDto: CreateGcgoDto) {
    return this.gcgoService.create(createGcgoDto);
  }

  @Get()
  findAll() {
    return this.gcgoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gcgoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGcgoDto: UpdateGcgoDto) {
    return this.gcgoService.update(id, updateGcgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gcgoService.remove(id);
  }
}
