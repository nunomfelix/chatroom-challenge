import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Message } from '../../message/entities/message.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Room, (room) => room.users)
  room: Room;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
