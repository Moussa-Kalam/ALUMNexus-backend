import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Mission } from '../../mission/entities/mission.entity';
import { Education } from '../../education/entities/education.entity';
import { Career } from '../../career/entities/career.entity';
import { Project } from '../../project/entities/project.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Opportunity } from '../../opportunity/entities/opportunity.entity';
import { GCGO } from '../../gcgo/entities/gcgo.entity';

@Entity()
export class AlumniProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  photo?: string;

  @Column()
  professionalTitle: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  website?: string;

  @OneToOne(() => Mission, { cascade: true, eager: true })
  mission: Mission;

  @OneToMany(() => Education, (education) => education.alumnus)
  education: Education[];

  @OneToMany(() => Career, (career) => career.alumnus)
  experiences: Career[];

  @OneToMany(() => Project, (project) => project.alumnus)
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.alumnus)
  skills: Skill[];

  @OneToMany(() => Opportunity, (opportunity) => opportunity.alumnus)
  opportunities: Opportunity[];

  @ManyToMany(() => GCGO, (gcgo) => gcgo.alumni)
  @JoinTable()
  gcgos: GCGO[];

  @OneToOne(() => User, (user) => user.alumniProfile, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
