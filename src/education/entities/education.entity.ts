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

  @Column()
  institution: string;

  @ManyToOne(() => AlumniProfile, (alumnus) => alumnus.education, {
    cascade: true,
  })
  alumnus: AlumniProfile;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
