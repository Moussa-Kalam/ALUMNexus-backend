import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { Repository } from 'typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from '../mission/entities/mission.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Project } from '../project/entities/project.entity';
import { GCGO } from '../gcgo/entities/gcgo.entity';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRoles } from '../common/enums/roles.enum';

@Injectable()
export class AlumniProfileService {
  constructor(
    @InjectRepository(AlumniProfile)
    readonly alumniRepository: Repository<AlumniProfile>,
    @InjectRepository(Mission)
    readonly missionRepository: Repository<Mission>,
    @InjectRepository(AlumniProfile)
    readonly skillRepository: Repository<Skill>,
    @InjectRepository(AlumniProfile)
    readonly projectRepository: Repository<Project>,
    @InjectRepository(AlumniProfile)
    readonly gcgoRepository: Repository<GCGO>,
  ) {}

  @Roles(UserRoles.ALUMNUS)
  async create(createAlumniProfileDto: CreateAlumniProfileDto) {
    const { mission, skills, projects, gcgos, ...profileData } =
      createAlumniProfileDto;

    if (!gcgos || gcgos.length < 2) {
      throw new BadRequestException('A mission must have at least 2 GCGOs');
    }

    // Create and save a new mission
    const newMission = this.missionRepository.create({ description: mission });
    await this.missionRepository.save(newMission);

    // Check if GCGOs exist in the database, otherwise create them
    const newGCGOs = await Promise.all(
      gcgos.map(async (gcgo) => {
        const existingGCGO = await this.gcgoRepository.preload({
          name: gcgo,
        });

        if (existingGCGO) {
          return existingGCGO;
        }
        return this.gcgoRepository.create({ name: gcgo });
      }),
    );
    await this.gcgoRepository.save(newGCGOs);

    // Link the GCGOs to the mission
    newMission.gcgos = newGCGOs;
    // Save the mission again to persist the relationship
    await this.missionRepository.save(newMission);

    // Create and save the skills
    const newSkills = await Promise.all(
      skills.map(async (skill) => {
        const existingSkill = await this.skillRepository.preload({
          name: skill.name,
        });

        if (existingSkill) {
          return existingSkill;
        }
        return this.skillRepository.create(skill);
      }),
    );
    await this.skillRepository.save(newSkills);

    // Create and save the projects
    const newProjects = await Promise.all(
      projects.map(async (project) => {
        const newProject = this.projectRepository.create({
          ...project,
        });
        return this.projectRepository.save(newProject);
      }),
    );

    // Create the alumni profile and associate the related entities
    const newProfile = this.alumniRepository.create({
      ...profileData,
      mission: newMission,
      skills: newSkills,
      projects: newProjects,
    });

    return this.alumniRepository.save(newProfile);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.alumniRepository.find({
      relations: ['mission', 'education', 'careers', 'projects', 'skills'],
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.alumniRepository.findOne({
      where: { id },
      relations: ['mission', 'education', 'careers', 'projects', 'skills'],
    });
  }

  update(id: number, updateAlumniProfileDto: UpdateAlumniProfileDto) {
    return `This action updates a #${id} alumniProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumniProfile`;
  }
}
