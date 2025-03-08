import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class GCGO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => AlumniProfile, (alumnus) => alumnus.gcgos)
  alumni: AlumniProfile[];
}
