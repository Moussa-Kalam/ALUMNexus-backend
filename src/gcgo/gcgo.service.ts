import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGcgoDto } from './dto/create-gcgo.dto';
import { UpdateGcgoDto } from './dto/update-gcgo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GCGO } from './entities/gcgo.entity';
import { AlumniProfile } from '../alumni-profile/entities/alumni-profile.entity';

@Injectable()
export class GcgoService {
  constructor(
    @InjectRepository(GCGO)
    private readonly gcgoRepository: Repository<GCGO>,
  ) {}

  findByName(name: string) {
    return this.gcgoRepository.findOne({ where: { name } });
  }

  async findOne(id: string) {
    const gcgo = await this.gcgoRepository.findOne({
      where: { id },
      relations: ['alumni'], // Ensure alumni relations are loaded
    });
    if (!gcgo) {
      throw new NotFoundException(`GCGO with ID ${id} not found`);
    }
    return gcgo;
  }

  async create(createGcgoDto: CreateGcgoDto) {
    const gcgo = this.gcgoRepository.create(createGcgoDto);
    return await this.gcgoRepository.save(gcgo);
  }

  async createOrUpdateGcgo(gcgoDto: CreateGcgoDto, alumnus?: AlumniProfile) {
    let gcgo = await this.findByName(gcgoDto.name);

    if (gcgo) {
      // Ensure alumni array is initialized
      gcgo.alumni = gcgo.alumni || [];

      // Check if alumnus is already linked before adding
      if (alumnus && !gcgo.alumni.some((a) => a.id === alumnus.id)) {
        gcgo.alumni = [...gcgo.alumni, alumnus];
      }
    } else {
      gcgo = this.gcgoRepository.create({
        ...gcgoDto,
        alumni: alumnus ? [alumnus] : [],
      });
    }
    return await this.gcgoRepository.save(gcgo);
  }

  findAll() {
    return this.gcgoRepository.find({ relations: ['alumni'] });
  }

  async update(id: string, updateGcgoDto: UpdateGcgoDto) {
    await this.findOne(id);
    await this.gcgoRepository.update(id, updateGcgoDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const gcgo = await this.findOne(id);
    await this.gcgoRepository.remove(gcgo);

    return { message: `GCGO with ID ${id} deleted successfully` };
  }
}
