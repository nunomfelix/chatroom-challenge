import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
  }

  @Post(':roomId/addUser')
  async addUserToRoom(
    @Param('roomId') roomId: string, 
    @Body() addUserToRoomDto: AddUserToRoomDto)
  {
    return await this.roomService.addUserToRoom(roomId, addUserToRoomDto);
  }

}
