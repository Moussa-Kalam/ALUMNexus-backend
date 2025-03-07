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

@Entity()
export class AlumniProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.alumniProfile, { onDelete: 'CASCADE' })
  user: User;

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

  @Column({ nullable: true })
  photo?: string;

  @Column()
  createdAt: Date;

  @OneToOne(() => Mission, { cascade: true, eager: true })
  @JoinColumn()
  mission: Mission;

  @OneToMany(() => Education, (education) => education.alumni)
  education: Education[];

  @OneToMany(() => Career, (career) => career.alumni)
  careers: Career[];

  @OneToMany(() => Project, (project) => project.alumni)
  projects: Project[];

  @ManyToMany(() => Skill, (skill) => skill.alumni)
  @JoinTable()
  skills: Skill[];
}
