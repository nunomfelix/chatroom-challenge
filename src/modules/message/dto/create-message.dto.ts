
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  
  @ApiProperty()
  content: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  roomName: string;
}
