import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { UserNotFoundException, RoomNotFoundException } from '../../core/exceptions';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { name } = createRoomDto;
    
    const room = await this.roomRepository.findOne({ where: { name: name }});
    if(!!room){
      throw new BadRequestException('Room exists already');
    }

    const newRoom = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(newRoom);
  }

  async addUserToRoom(
    roomName: string,
    addUserToRoomDto: AddUserToRoomDto,
  ): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { name: roomName }, relations: ['users']});
    const user = await this.userRepository.findOne({ where: { username: addUserToRoomDto.username}});

    if (!room) {
      throw new RoomNotFoundException('Room not found');
    }

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    const userInRoom = room.users.find((user) => user.username === addUserToRoomDto.username)
    if (!!userInRoom){
      throw new BadRequestException('User is already in the room');
    }

    room.users.push(user);
    return await this.roomRepository.save(room);
  }

  async findByRoomname(roomName: string): Promise<Room | undefined> {
    return await this.roomRepository.findOne({ where: { name: roomName } });
  }

}