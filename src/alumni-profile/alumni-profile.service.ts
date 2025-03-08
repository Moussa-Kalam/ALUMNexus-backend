import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { Repository } from 'typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRoles } from '../common/enums/roles.enum';
import { MissionService } from 'src/mission/mission.service';
import { CareerService } from 'src/career/career.service';
import { EducationService } from 'src/education/education.service';
import { GcgoService } from 'src/gcgo/gcgo.service';
import { ProjectService } from 'src/project/project.service';
import { SkillsService } from 'src/skills/skills.service';
import { UsersService } from 'src/users/users.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Injectable()
export class AlumniProfileService {
  constructor(
    @InjectRepository(AlumniProfile)
    readonly alumniRepository: Repository<AlumniProfile>,
    private readonly missionService: MissionService,
    private readonly educationService: EducationService,
    private readonly careerService: CareerService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillsService,
    private readonly gcgoService: GcgoService,
    private readonly userService: UsersService,
  ) {}

  @Roles(UserRoles.ALUMNUS)
  async create(
    createAlumniProfileDto: CreateAlumniProfileDto,
    activeUser: ActiveUserData,
  ) {
    try {
      const { mission, education, career, projects, skills, gcgos, ...alumni } =
        createAlumniProfileDto;

      await this.missionService.create(mission);

      await Promise.all(
        education.map((edu) => this.educationService.create(edu)),
      );

      await Promise.all(career.map((car) => this.careerService.create(car)));

      await Promise.all(
        projects.map((proj) => this.projectService.create(proj)),
      );

      await Promise.all(skills.map((skill) => this.skillService.create(skill)));
      await Promise.all(gcgos.map((gcgo) => this.gcgoService.create(gcgo)));

      const currentUser = await this.userService.findUserById(activeUser.sub);

      return await this.alumniRepository.save({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        ...alumni,
      });
    } catch (error) {
      throw error;
    }
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    try {
      const alumni = this.alumniRepository.find({
        order: {
          createdAt: 'DESC',
        },
        relations: [
          'mission',
          'education',
          'experiences',
          'projects',
          'skills',
        ],
        skip: offset,
        take: limit,
      });
      if (!alumni) {
        throw new NotFoundException();
      }
      return alumni;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      const alumni = this.alumniRepository.findOne({
        where: { id },
        relations: [
          'mission',
          'education',
          'experiences',
          'projects',
          'skills',
        ],
      });
      if (!alumni) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateAlumniProfileDto: UpdateAlumniProfileDto) {
    this.findOne(id);
    try {
      return this.alumniRepository.update(id, updateAlumniProfileDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.alumniRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
