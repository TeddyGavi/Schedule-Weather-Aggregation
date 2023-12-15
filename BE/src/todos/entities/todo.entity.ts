import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  user_id: string;
}
