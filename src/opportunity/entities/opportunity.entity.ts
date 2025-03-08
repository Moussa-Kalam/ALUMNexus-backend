import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Opportunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  link: string;

  @Column()
  deadline: string;

  @ManyToOne(() => AlumniProfile, (alumnus) => alumnus.opportunities)
  alumnus: AlumniProfile;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
