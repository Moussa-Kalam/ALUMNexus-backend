import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GCGO } from '../../gcgo/entities/gcgo.entity';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => GCGO, (gcgo) => gcgo.missions)
  @JoinTable()
  gcgos: GCGO[];
}
