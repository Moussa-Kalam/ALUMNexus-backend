import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { MissionService } from 'src/mission/mission.service';
import { CareerService } from 'src/career/career.service';
import { EducationService } from 'src/education/education.service';
import { GcgoService } from 'src/gcgo/gcgo.service';
import { ProjectService } from 'src/project/project.service';
import { SkillsService } from 'src/skills/skills.service';
import { UsersService } from 'src/users/users.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { pgUniqueViolationErrorCode } from '../common/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlumniProfileService {
  constructor(
    @InjectRepository(AlumniProfile)
    readonly alumniProfileRepository: Repository<AlumniProfile>,
    private readonly missionService: MissionService,
    private readonly educationService: EducationService,
    private readonly careerService: CareerService,
    private readonly projectService: ProjectService,
    private readonly skillService: SkillsService,
    private readonly gcgoService: GcgoService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createAlumniProfileDto: CreateAlumniProfileDto,
    activeUser: ActiveUserData,
  ) {
    const currentUser = await this.userService.findUserById(activeUser.sub);

    if (!currentUser) {
      throw new UnauthorizedException('Please log in first!');
    }

    try {
      const { mission, education, career, projects, skills, gcgos, ...alumni } =
        createAlumniProfileDto;

      const newAlumnusProfile = this.alumniProfileRepository.create({
        ...alumni,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        user: currentUser, // Associate the profile with the current user
      });

      const savedAlumnusProfile =
        await this.alumniProfileRepository.save(newAlumnusProfile);

      // Create related entities
      await this.missionService.createAlumnusMission(
        mission,
        newAlumnusProfile,
      );

      await Promise.all(
        education.map((edu) =>
          this.educationService.createAlumnusEducation(
            edu,
            savedAlumnusProfile,
          ),
        ),
      );

      await Promise.all(
        career.map((experience) =>
          this.careerService.createExperience(experience, savedAlumnusProfile),
        ),
      );

      await Promise.all(
        projects.map((proj) =>
          this.projectService.createAlumnusProject(proj, savedAlumnusProfile),
        ),
      );

      await Promise.all(
        skills.map((skill) =>
          this.skillService.createAlumnusSkill(skill, savedAlumnusProfile),
        ),
      );

      await Promise.all(
        gcgos.map(async (gcgo) => {
          await this.gcgoService.linkAlumnusToGcgo(gcgo, savedAlumnusProfile);
        }),
      );

      return savedAlumnusProfile;
    } catch (error) {
      if (error.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('You already have an alumni profile.');
      }
      throw error;
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    const alumni = await this.alumniProfileRepository.find({
      relations: [
        'mission',
        'education',
        'experiences',
        'projects',
        'skills',
        'gcgos',
        'user',
      ],
      skip: offset,
      take: limit,
    });

    if (!alumni) {
      throw new NotFoundException('No alumni profiles found!');
    }

    return alumni;
  }

  findOne(id: string) {
    try {
      const alumni = this.alumniProfileRepository.findOne({
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

  async findOneByUserId(userId: string) {
    try {
      const alumni = await this.alumniProfileRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!alumni) {
        throw new NotFoundException(
          'Alumni profile not found! Please create one.',
        );
      }

      return alumni;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateAlumniProfileDto: UpdateAlumniProfileDto) {
    this.findOne(id);
    try {
      return this.alumniProfileRepository.update(id, updateAlumniProfileDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    this.findOne(id);
    try {
      return this.alumniProfileRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
