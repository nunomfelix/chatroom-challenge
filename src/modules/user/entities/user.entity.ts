import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Message } from '../../message/entities/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  // @Column()
  // password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Room, (room) => room.users, { cascade: true})
  @JoinTable()
  rooms: Room[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
