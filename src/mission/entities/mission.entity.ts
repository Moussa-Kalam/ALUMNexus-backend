import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
