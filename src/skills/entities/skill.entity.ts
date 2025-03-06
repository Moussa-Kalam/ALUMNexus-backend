import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => AlumniProfile, (alumni) => alumni.skills)
  alumni: AlumniProfile[];
}
