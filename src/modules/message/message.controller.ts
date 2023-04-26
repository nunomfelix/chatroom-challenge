import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.createMessage(createMessageDto);
  }

  @Get('latest/:roomName')
  async getLatestMessages(
    @Param('roomName') roomName: string,
    @Query('limit') limit?: number,
  ): Promise<Message[]> {
    return this.messageService.getLatestMessages(roomName, limit);
  }
  
}
