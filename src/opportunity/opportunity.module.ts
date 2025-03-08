import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { Opportunity } from './entities/opportunity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity])],
  controllers: [OpportunityController],
  providers: [OpportunityService],
})
export class OpportunityModule {}
