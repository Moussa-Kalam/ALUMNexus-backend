import { Module } from '@nestjs/common';
import { AlumniProfileService } from './alumni-profile.service';
import { AlumniProfileController } from './alumni-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';
import { CareerModule } from 'src/career/career.module';
import { EducationModule } from 'src/education/education.module';
import { GcgoModule } from 'src/gcgo/gcgo.module';
import { MissionModule } from 'src/mission/mission.module';
import { ProjectModule } from 'src/project/project.module';
import { SkillsModule } from 'src/skills/skills.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlumniProfile]),
    CareerModule,
    EducationModule,
    GcgoModule,
    ProjectModule,
    SkillsModule,
    MissionModule,
    UsersModule,
  ],
  controllers: [AlumniProfileController],
  providers: [AlumniProfileService],
})
export class AlumniProfileModule {}
