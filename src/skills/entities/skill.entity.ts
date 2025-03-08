import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => AlumniProfile, (alumni) => alumni.skills)
  alumnus: AlumniProfile[];
}
