import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

describe('MessageController', () => {
  let messageController: MessageController;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            createMessage: jest.fn(),
            getLatestMessages: jest.fn(),
          },
        },
      ],
    }).compile();

    messageController = module.get<MessageController>(MessageController);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should call createMessage and return the result', async () => {
    const createMessageDto: CreateMessageDto = {
      content: 'Hello, world!',
      userName: 'user1',
      roomName: 'test-room',
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

    jest.spyOn(messageService, 'createMessage').mockResolvedValue(expectedResult as Message);

    const result = await messageController.createMessage(createMessageDto);

    expect(result).toEqual(expectedResult);
    expect(messageService.createMessage).toHaveBeenCalledWith(createMessageDto);
  });

  it('should call getLatestMessages and return the result', async () => {
    const roomName = 'test-room';
    const limit = 5;
    const expectedResult: any[] = [
      {
        id: '1',
        content: 'Hello, world!',
        createdAt: new Date(),
        username: 'user1'
      },
    ];

    jest.spyOn(messageService, 'getLatestMessages').mockResolvedValue(expectedResult);

    const result = await messageController.getLatestMessages(roomName, limit);

    expect(result).toEqual(expectedResult);
    expect(messageService.getLatestMessages).toHaveBeenCalledWith(roomName, limit);
  });
});
