import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: {
            createRoom: jest.fn(),
            addUserToRoom: jest.fn(),
          },
        },
      ],
    }).compile();

    roomController = module.get<RoomController>(RoomController);
    roomService = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(roomController).toBeDefined();
  });

  describe('createRoom', () => {
    it('should create a room', async () => {
      const roomDto: CreateRoomDto = { name: 'test-room' };
      const room = new Room();
      room.name = roomDto.name;

      jest.spyOn(roomService, 'createRoom').mockResolvedValue(room);

      const result = await roomController.createRoom(roomDto);

      expect(result).toEqual(room);
      expect(roomService.createRoom).toHaveBeenCalledWith(roomDto);
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

      room.users.push(user);

      jest.spyOn(roomService, 'addUserToRoom').mockResolvedValue(room);

      const result = await roomController.addUserToRoom(roomName, addUserDto);

      expect(result).toEqual(room);
      expect(roomService.addUserToRoom).toHaveBeenCalledWith(roomName, addUserDto);
    });
  });
});
