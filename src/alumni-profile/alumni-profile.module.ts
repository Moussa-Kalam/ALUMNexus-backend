import { Module } from '@nestjs/common';
import { AlumniProfileService } from './alumni-profile.service';
import { AlumniProfileController } from './alumni-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniProfile } from './entities/alumni-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumniProfile])],
  controllers: [AlumniProfileController],
  providers: [AlumniProfileService],
})
export class AlumniProfileModule {}
