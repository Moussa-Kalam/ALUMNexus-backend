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

  @ManyToOne(() => AlumniProfile, (alumnus) => alumnus.education, {
    onDelete: 'CASCADE',
  })
  alumnus: AlumniProfile;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
