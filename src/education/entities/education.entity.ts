import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlumniProfile, (alumni) => alumni.education, {
    onDelete: 'CASCADE',
  })
  alumni: AlumniProfile;

  @Column()
  studyField: string;

  @Column()
  graduationYear: number;
}
