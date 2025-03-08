import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    try {
      const newSkill = this.skillRepository.create({
        ...createSkillDto,
      });
      await this.skillRepository.save(newSkill);
    } catch (error) {
      throw error;
    }
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Find all skills in the database and return them sorted by creation date descending.
   * @returns {Promise<Skill[]>} A promise of an array of Skill objects.
   */
  /******  55809b4a-615d-4fa2-84cb-bd8e0fd0594b  *******/
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
