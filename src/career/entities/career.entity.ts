import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class Career {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlumniProfile, (alumni) => alumni.careers, {
    onDelete: 'CASCADE',
  })
  alumni: AlumniProfile;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column()
  location: string;
}
