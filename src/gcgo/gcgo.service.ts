import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGcgoDto } from './dto/create-gcgo.dto';
import { UpdateGcgoDto } from './dto/update-gcgo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GCGO } from './entities/gcgo.entity';

@Injectable()
export class GcgoService {
  constructor(
    @InjectRepository(GCGO)
    private readonly gcgoRepository: Repository<GCGO>,
  ) {}
  async create(createGcgoDto: CreateGcgoDto) {
    try {
      const gcgo = await this.gcgoRepository.findOne({
        where: { name: createGcgoDto.name },
      });
      if (gcgo) {
        return gcgo;
      }

      const newGcgo = this.gcgoRepository.create({ ...createGcgoDto });
      return await this.gcgoRepository.save(newGcgo);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.gcgoRepository.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      const gcgo = this.gcgoRepository.findOneBy({ id });
      if (!gcgo) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateGcgoDto: UpdateGcgoDto) {
    await this.findOne(id);
    try {
      return this.gcgoRepository.update(id, updateGcgoDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} gcgo`;
  }
}
