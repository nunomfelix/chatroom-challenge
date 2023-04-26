import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateMessageDto,
    description: 'Create message',
  })
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.createMessage(createMessageDto);
  }

  @Get('latest/:roomName')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get latest messages in a room' })
  @ApiParam({ name: 'roomName', description: 'Name of the room' })
  @ApiQuery({ name: 'limit', required: false, description: 'Maximum number of messages to retrieve' })
  @ApiOkResponse({
    status: 200,
    description: 'The latest messages in the room have been successfully retrieved.',
    type: [Message],
  })
  async getLatestMessages(
    @Param('roomName') roomName: string,
    @Query('limit') limit?: number,
  ): Promise<Message[]> {
    return this.messageService.getLatestMessages(roomName, limit);
  }
  
}
