import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userDto: CreateUserDto = { username: 'test-user' };
      const user = new User();
      user.username = userDto.username;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userService.createUser(userDto);

      expect(result).toEqual(user);
    });

    it('should throw an error if the user already exists', async () => {
      const userDto: CreateUserDto = { username: 'test-user' };
      const user = new User();
      user.username = userDto.username;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await expect(userService.createUser(userDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByUsername', () => {
    it('should find a user by its username', async () => {
      const username = 'test-user';
      const user = new User();
      user.username = username;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findByUsername(username);

      expect(result).toEqual(user);
    });
  });

  describe('findById', () => {
    it('should find a user by its id', async () => {
      const id = 'test-id';
      const user = new User();
      user.id = id;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findById(id);

      expect(result).toEqual(user);
    });
  });
});
