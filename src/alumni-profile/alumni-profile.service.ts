import { Injectable } from '@nestjs/common';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { Repository } from 'typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRoles } from '../common/enums/roles.enum';

@Injectable()
export class AlumniProfileService {
  constructor(
    @InjectRepository(AlumniProfile)
    readonly alumniRepository: Repository<AlumniProfile>,
  ) {}

  @Roles(UserRoles.ALUMNUS)
  async create(createAlumniProfileDto: CreateAlumniProfileDto) {}

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
