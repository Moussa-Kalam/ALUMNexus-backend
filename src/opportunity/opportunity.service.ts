import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Opportunity } from './entities/opportunity.entity';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { AlumniProfileService } from '../alumni-profile/alumni-profile.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    private readonly alumniProfileService: AlumniProfileService,
  ) {}

  async create(
    createOpportunityDto: CreateOpportunityDto,
    activeUser: ActiveUserData,
  ) {
    try {
      // Get the alumni with the id from the active user
      const alumnus = await this.alumniProfileService.findOneByUserId(
        activeUser.sub,
      );
      // Create a new opportunity and connect that alumnus with the opportunity
      const opportunity = this.opportunityRepository.create({
        ...createOpportunityDto,
        alumnus,
      });
      return this.opportunityRepository.save(opportunity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page, title, category } = paginationQuery;

    // Calculate the offset based on the page and limit
    const offset = (page && (page - 1) * limit) || 0;

    const query = this.opportunityRepository
      .createQueryBuilder('opportunity')
      .leftJoinAndSelect('opportunity.alumnus', 'alumnus')
      .where('CAST(opportunity.deadline AS timestamp) > NOW()')
      .orderBy('opportunity.createdAt', 'DESC');

    if (title) {
      query.andWhere('LOWER(opportunity.title) ILIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (category) {
      query.andWhere('LOWER(opportunity.category) ILIKE LOWER(:category)', {
        category: `%${category}%`,
      });
    }

    // Get the total number of opportunities
    const total = await query.getCount();

    // Get the opportunities based on the pagination
    if (page) {
      query.skip(offset).take(limit);
    }

    const opportunities = await query.getMany();

    return { opportunities, total };
  }

  findOne(id: string) {
    try {
      const opportunity = this.opportunityRepository.findOneBy({ id });
      if (!opportunity) {
        throw new NotFoundException();
      }
      return opportunity;
    } catch (error) {
      throw error;
    }
  }

  findRecent() {
    try {
      return this.opportunityRepository.find({
        order: {
          createdAt: 'DESC',
        },
        take: 3,
        relations: ['alumnus'],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    await this.findOne(id);
    try {
      return this.opportunityRepository.update(id, updateOpportunityDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return this.opportunityRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
