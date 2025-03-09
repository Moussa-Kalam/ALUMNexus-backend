import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../../common/enums/roles.enum';
import { AlumniProfile } from '../../alumni-profile/entities/alumni-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.ALUMNUS,
  })
  accountType: UserRoles;

  @OneToOne(() => AlumniProfile, (profile) => profile.user, { cascade: true })
  alumniProfile: AlumniProfile;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;

  @Column({ nullable: true })
  googleId: string;
}
