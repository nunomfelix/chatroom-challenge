import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { BadRequestException } from '@nestjs/common';
import { RoomNotFoundException, UserNotFoundException } from '../../core/exceptions';

describe('RoomService', () => {
  let roomService: RoomService;
  let roomRepository: Repository<Room>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    roomService = module.get<RoomService>(RoomService);
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(roomService).toBeDefined();
  });

  describe('createRoom', () => {
    it('should create a new room', async () => {
      const roomDto: CreateRoomDto = { name: 'test-room' };
      const room = new Room();
      room.name = roomDto.name;

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(roomRepository, 'create').mockReturnValue(room);
      jest.spyOn(roomRepository, 'save').mockResolvedValue(room);

      const result = await roomService.createRoom(roomDto);

      expect(result).toEqual(room);
    });

    it('should throw an error if the room already exists', async () => {
      const roomDto: CreateRoomDto = { name: 'test-room' };
      const room = new Room();
      room.name = roomDto.name;

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);

      await expect(roomService.createRoom(roomDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('addUserToRoom', () => {
    it('should add a user to a room', async () => {
      const roomName = 'test-room';
      const addUserDto: AddUserToRoomDto = { username: 'test-user' };
      const room = new Room();
      room.name = roomName;
      room.users = [];

      const user = new User();
      user.username = addUserDto.username;

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(roomRepository, 'save').mockResolvedValue(room);

      const result = await roomService.addUserToRoom(roomName, addUserDto);

      expect(result).toEqual(room);
    });

    it('should throw an error if the room is not found', async () => {
      const roomName = 'test-room';
      const addUserDto: AddUserToRoomDto = { username: 'test-user' };

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(undefined);

      await expect(roomService.addUserToRoom(roomName, addUserDto)).rejects.toThrow(RoomNotFoundException);
    });

    it('should throw an error if the user is not found', async () => {
      const roomName = 'test-room';
      const addUserDto: AddUserToRoomDto = { username: 'test-user' };
      const room = new Room();
      room.name = roomName;
      room.users = [];

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(roomService.addUserToRoom(roomName, addUserDto)).rejects.toThrow(UserNotFoundException);
    });

    it('should throw an error if the user is already in the room', async () => {
      const roomName = 'test-room';
      const addUserDto: AddUserToRoomDto = { username: 'test-user' };
      const room = new Room();
      room.name = roomName;

      const user = new User();
      user.username = addUserDto.username;

      room.users = [user];

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await expect(roomService.addUserToRoom(roomName, addUserDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByRoomname', () => {
    it('should find a room by its name', async () => {
      const roomName = 'test-room';
      const room = new Room();
      room.name = roomName;

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);

      const result = await roomService.findByRoomname(roomName);

      expect(result).toEqual(room);
    });
  });
});
