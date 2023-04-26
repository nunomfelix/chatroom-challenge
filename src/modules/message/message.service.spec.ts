import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { Message } from './entities/message.entity';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserNotFoundException, RoomNotFoundException } from '../../core/exceptions';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';

describe('MessageService', () => {
  let messageService: MessageService;
  let messageRepository: Repository<Message>;
  let roomService: RoomService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository,
        },
        {
          provide: RoomService,
          useValue: {
            findByRoomname: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message));
    roomService = module.get<RoomService>(RoomService);
    userService = module.get<UserService>(UserService);
  });

  describe('createMessage', () => {
    it('should create a message and return the result', async () => {
      const createMessageDto: CreateMessageDto = {
        content: 'Hello, world!',
        userName: 'user1',
        roomName: 'test-room',
      };

      const user: User = {
        id: '1',
        username: createMessageDto.userName,
        name: 'John Doe',
        createdAt: new Date('2023-04-26T20:54:15.439Z'),
        updatedAt: new Date('2023-04-26T20:54:15.439Z'),
        messages: [],
        rooms: [],
      };

      const room: Room = {
        id: '1',
        createdAt: new Date('2023-04-26T20:54:15.439Z'),
        updatedAt: new Date('2023-04-26T20:54:15.439Z'),
        name: createMessageDto.roomName,
        messages: [],
        users: [],
      };

      type ExpectedMessage = Omit<Message, 'id' | 'createdAt' | 'user' | 'room'> & {
        user: { id: string; username: string };
        room: { id: string; name: string };
      };

      const expectedResult: ExpectedMessage = {
        content: createMessageDto.content,
        user: { id: '1', username: createMessageDto.userName },
        room: { id: '1', name: createMessageDto.roomName },
      };

      jest.spyOn(roomService, 'findByRoomname').mockResolvedValue(room);
      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(messageRepository, 'create').mockReturnValue(expectedResult as Message);
      jest.spyOn(messageRepository, 'save').mockResolvedValue(expectedResult as Message);

      const result = await messageService.createMessage(createMessageDto);

      expect(result).toEqual(expectedResult);
      expect(roomService.findByRoomname).toHaveBeenCalledWith(createMessageDto.roomName);
      expect(userService.findByUsername).toHaveBeenCalledWith(createMessageDto.userName);
      expect(messageRepository.create).toHaveBeenCalledWith({ content: createMessageDto.content, room, user });
      expect(messageRepository.save).toHaveBeenCalledWith(expectedResult as Message);
    });

    describe('getLatestMessages', () => {
      it('should return the latest messages from a room', async () => {
        const roomName = 'test-room';
        const limit = 5;
        const room: Room = {
          id: '1',
          name: roomName,
          createdAt: new Date('2023-04-26T20:54:15.439Z'),
          updatedAt: new Date('2023-04-26T20:54:15.439Z'),
          messages: [],
          users: [],
        };
    
        type ExpectedMessage = Omit<Message, 'id' | 'createdAt' | 'user' | 'room'> & {
          user: { id: string; username: string };
          room: { id: string; name: string };
        };
    
        const expectedResult: ExpectedMessage[] = [
          {
            content: 'Hello, world!',
            user: { id: '1', username: 'user1' },
            room: { id: '1', name: roomName },
          },
        ];
    
        jest.spyOn(roomService, 'findByRoomname').mockResolvedValue(room);
        const result = await messageService.getLatestMessages(roomName, limit);
    
        expect(result).toEqual(expectedResult);
        expect(roomService.findByRoomname).toHaveBeenCalledWith(roomName);
      });
    
      it('should throw a RoomNotFoundException if room not found', async () => {
        const roomName = 'test-room';
        const limit = 5;
    
        jest.spyOn(roomService, 'findByRoomname').mockResolvedValue(null);
    
        await expect(messageService.getLatestMessages(roomName, limit)).rejects.toThrow(RoomNotFoundException);
        expect(roomService.findByRoomname).toHaveBeenCalledWith(roomName);
      });
    });
    
  });

  // ... other test suites ...
});
