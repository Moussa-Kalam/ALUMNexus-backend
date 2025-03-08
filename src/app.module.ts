import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamModule } from './iam/iam.module';
import { AlumniProfileModule } from './alumni-profile/alumni-profile.module';
import { MissionModule } from './mission/mission.module';
import { GcgoModule } from './gcgo/gcgo.module';
import { EducationModule } from './education/education.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectModule } from './project/project.module';
import { CareerModule } from './career/career.module';
import { OpportunityModule } from './opportunity/opportunity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    IamModule,
    AlumniProfileModule,
    MissionModule,
    GcgoModule,
    EducationModule,
    SkillsModule,
    ProjectModule,
    CareerModule,
    OpportunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
