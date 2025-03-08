import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Opportunity } from './entities/opportunity.entity';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}
  create(createOpportunityDto: CreateOpportunityDto) {
    try {
      const opportunity = this.opportunityRepository.create({
        ...createOpportunityDto,
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
