import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from './entities/career.entity';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}
  async create(createCareerDto: CreateCareerDto) {
    try {
      const career = this.careerRepository.create({ ...createCareerDto });
      return await this.careerRepository.save(career);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.careerRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      const career = this.careerRepository.findOneBy({ id });
      if (!career) {
        throw new NotFoundException();
      }
      return career;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateCareerDto: UpdateCareerDto) {
    this.findOne(id);
    try {
      return this.careerRepository.update(id, updateCareerDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.careerRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
