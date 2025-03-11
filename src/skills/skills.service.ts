import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { AlumniProfile } from '../alumni-profile/entities/alumni-profile.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    try {
      const skill = this.skillRepository.create({
        ...createSkillDto,
      });
      return this.skillRepository.save(skill);
    } catch (error) {
      throw error;
    }
  }

  async createAlumnusSkill(
    createSkillDto: CreateSkillDto,
    alumnus: AlumniProfile,
  ) {
    try {
      const newSkill = this.skillRepository.create({
        ...createSkillDto,
        alumnus,
      });
      await this.skillRepository.save(newSkill);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.skillRepository.find({
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
      const skill = this.skillRepository.findOneBy({ id });
      if (!skill) {
        throw new NotFoundException();
      }
      return skill;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    this.findOne(id);
    try {
      return this.skillRepository.update(id, updateSkillDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.skillRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
