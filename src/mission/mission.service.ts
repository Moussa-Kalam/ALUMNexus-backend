import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { Repository } from 'typeorm';
import { CreateMissionDto } from './dto/create-mission.dto';
import { AlumniProfile } from '../alumni-profile/entities/alumni-profile.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
  ) {}

  create(createMissionDto: CreateMissionDto) {
    try {
      const newMission = this.missionRepository.create(createMissionDto);
      return this.missionRepository.save(newMission);
    } catch (error) {
      throw error;
    }
  }

  async createAlumnusMission(
    createMissionDto: CreateMissionDto,
    alumnus: AlumniProfile,
  ) {
    try {
      const newMission = this.missionRepository.create({
        ...createMissionDto,
        alumnus,
      });

      return await this.missionRepository.save(newMission);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.missionRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const mission = await this.missionRepository.findOneBy({ id });
      if (!mission) {
        throw new NotFoundException();
      }
      return mission;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateMissionDto: UpdateMissionDto) {
    this.findOne(id);
    try {
      return this.missionRepository.update(id, updateMissionDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.missionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
