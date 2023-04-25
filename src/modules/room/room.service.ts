import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(newRoom);
  }

  async addUserToRoom(
    roomId: string,
    addUserToRoomDto: AddUserToRoomDto,
  ): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: roomId }, relations: ['users'] });
    const user = await this.userRepository.findOne({ where: { id: addUserToRoomDto.userId}});

    if (!room || !user) {
      throw new NotFoundException('Room or User not found');
    }

    // Check if the user is already in the room
    if (room.users.some(u => u.id === user.id)) {
      throw new BadRequestException('User is already in the room');
    }

    room.users.push(user);
    return await this.roomRepository.save(room);
  }

}