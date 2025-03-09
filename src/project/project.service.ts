import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { AlumniProfile } from '../alumni-profile/entities/alumni-profile.entity';

@Auth(AuthType.None)
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    public readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, alumnus?: AlumniProfile) {
    try {
      const project = this.projectRepository.create({
        ...createProjectDto,
        alumnus,
      });
      return await this.projectRepository.save(project);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.projectRepository.find({
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
      const project = this.projectRepository.findOneBy({ id });
      if (!project) {
        throw new NotFoundException();
      }
      return project;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    this.findOne(id);
    try {
      return this.projectRepository.update(id, updateProjectDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.projectRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
