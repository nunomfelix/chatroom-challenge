import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userDto: CreateUserDto = { username: 'test-user' };
      const user = new User();
      user.username = userDto.username;

      jest.spyOn(userService, 'createUser').mockResolvedValue(user);

      const result = await userController.createUser(userDto);

      expect(result).toEqual(user);
      expect(userService.createUser).toHaveBeenCalledWith(userDto);
    });
  });
});
