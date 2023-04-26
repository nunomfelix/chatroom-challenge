import { ApiProperty } from '@nestjs/swagger';

export class AddUserToRoomDto {

  @ApiProperty()
  username: string;
}
