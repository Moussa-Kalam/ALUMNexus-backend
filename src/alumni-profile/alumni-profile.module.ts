import { Module } from '@nestjs/common';
import { AlumniProfileService } from './alumni-profile.service';
import { AlumniProfileController } from './alumni-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { Mission } from '../mission/entities/mission.entity';
import { Skill } from '../skills/entities/skill.entity';
import { Project } from '../project/entities/project.entity';
import { GCGO } from '../gcgo/entities/gcgo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlumniProfile, Mission, Skill, Project, GCGO]),
  ],
  controllers: [AlumniProfileController],
  providers: [AlumniProfileService],
})
export class AlumniProfileModule {}
