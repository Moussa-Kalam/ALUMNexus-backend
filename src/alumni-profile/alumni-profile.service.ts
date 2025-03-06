import { Injectable } from '@nestjs/common';
import { CreateAlumniProfileDto } from './dto/create-alumni-profile.dto';
import { UpdateAlumniProfileDto } from './dto/update-alumni-profile.dto';
import { Repository } from 'typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class AlumniProfileService {
  constructor(private readonly alumniRepository: Repository<AlumniProfile>) {}

  create(createAlumniProfileDto: CreateAlumniProfileDto) {
    return 'This action adds a new alumniProfile';
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.alumniRepository.find({
      relations: ['mission', 'education', 'careers', 'projects', 'skills'],
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} alumniProfile`;
  }

  update(id: number, updateAlumniProfileDto: UpdateAlumniProfileDto) {
    return `This action updates a #${id} alumniProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumniProfile`;
  }
}
