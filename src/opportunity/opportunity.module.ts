import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { Opportunity } from './entities/opportunity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniProfileModule } from '../alumni-profile/alumni-profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity]), AlumniProfileModule],
  controllers: [OpportunityController],
  providers: [OpportunityService],
  exports: [OpportunityService],
})
export class OpportunityModule {}
