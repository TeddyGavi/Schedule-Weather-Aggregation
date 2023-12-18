import { Users } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: null })
  completed_at: Date;

  @ManyToOne(() => Users, (user) => user.todos, { onDelete: 'CASCADE' })
  user: Users;
}
