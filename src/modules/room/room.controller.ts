import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Post(':roomName/addUser')
  async addUserToRoom(
    @Param('roomName') roomName: string, 
    @Body() addUserToRoomDto: AddUserToRoomDto)
  {
    return await this.roomService.addUserToRoom(roomName, addUserToRoomDto);
  }

}
