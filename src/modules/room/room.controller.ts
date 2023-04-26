import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { ApiTags, ApiResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateRoomDto,
    description: 'Create room',
  })
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Post(':roomName/addUser')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'roomName', description: 'Name of the room' })
  @ApiOkResponse({
    type: [User],
    description: 'Add user to a room',
  })
  async addUserToRoom(
    @Param('roomName') roomName: string, 
    @Body() addUserToRoomDto: AddUserToRoomDto)
  {
    return await this.roomService.addUserToRoom(roomName, addUserToRoomDto);
  }

}
