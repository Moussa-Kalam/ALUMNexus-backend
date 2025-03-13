import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Opportunity } from './entities/opportunity.entity';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { AlumniProfileService } from '../alumni-profile/alumni-profile.service';

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

  findAll() {
    try {
      return this.opportunityRepository.find({
        order: {
          createdAt: 'DESC',
        },
        relations: ['alumnus'],
      });
    } catch (error) {
      throw error;
    }
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
