import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  degree: string;

  @Column()
  specialization: string;

  @Column()
  graduationYear: number;

  @ManyToOne(() => AlumniProfile, (alumni) => alumni.education, {
    onDelete: 'CASCADE',
  })
  alumni: AlumniProfile;
}
