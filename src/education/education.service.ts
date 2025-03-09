import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';
import { AlumniProfile } from '../alumni-profile/entities/alumni-profile.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async create(
    createEducationDto: CreateEducationDto,
    alumnus?: AlumniProfile,
  ) {
    try {
      const education = this.educationRepository.create({
        ...createEducationDto,
        alumnus,
      });
      await this.educationRepository.save(education);
      return education;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.educationRepository.find({
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
      const education = this.educationRepository.findOneBy({ id });
      if (!education) {
        throw new NotFoundException();
      }
      return education;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    this.findOne(id);
    try {
      return this.educationRepository.update(id, updateEducationDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.educationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
