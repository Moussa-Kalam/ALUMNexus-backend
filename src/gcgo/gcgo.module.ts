import { Module } from '@nestjs/common';
import { GcgoService } from './gcgo.service';
import { GcgoController } from './gcgo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GCGO } from './entities/gcgo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GCGO])],
  controllers: [GcgoController],
  providers: [GcgoService],
})
export class GcgoModule {}
