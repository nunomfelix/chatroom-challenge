import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';
import { Message } from '../message/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, User, Message]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
