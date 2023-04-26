import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { UserNotFoundException, RoomNotFoundException } from '../../core/exceptions';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const room = await this.roomService.findByRoomname(createMessageDto.roomName);
    const user = await this.userService.findByUsername(createMessageDto.userName);

    if(!room){
      throw new RoomNotFoundException()
    }

    if(!user){
      throw new UserNotFoundException()
    }

    const newMessage = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(newMessage);
  }

  async getLatestMessages(roomName: string, limit: number = 10): Promise<Message[]> {
    const room = await this.roomService.findByRoomname(roomName);
    
    if(!room) {
      throw new RoomNotFoundException()
    }

    console.info('[getLatestMessages.messages]', await this.messageRepository.find({
      where: { room },
      order: { createdAt: 'DESC' },
      take: limit
    }))

    return await this.messageRepository.find({
      where: { room },
      order: { createdAt: 'DESC' },
      take: limit
    })
  }
}