import { Todos } from 'src/todos/entities/todo.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todos, (todo) => todo.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  todos: Todos[];
}
