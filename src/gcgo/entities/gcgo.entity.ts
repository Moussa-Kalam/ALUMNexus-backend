import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mission } from '../../mission/entities/mission.entity';

@Entity()
export class GCGO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Mission, (mission) => mission.gcgos)
  missions: Mission[];
}
