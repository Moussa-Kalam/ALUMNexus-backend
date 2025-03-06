import { Injectable } from '@nestjs/common';
import { CreateGcgoDto } from './dto/create-gcgo.dto';
import { UpdateGcgoDto } from './dto/update-gcgo.dto';

@Injectable()
export class GcgoService {
  create(createGcgoDto: CreateGcgoDto) {
    return 'This action adds a new gcgo';
  }

  findAll() {
    return `This action returns all gcgo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gcgo`;
  }

  update(id: number, updateGcgoDto: UpdateGcgoDto) {
    return `This action updates a #${id} gcgo`;
  }

  remove(id: number) {
    return `This action removes a #${id} gcgo`;
  }
}
