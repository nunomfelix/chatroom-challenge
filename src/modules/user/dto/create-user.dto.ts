import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto{
  @ApiProperty()
  username: string;

  @ApiPropertyOptional()
  name: string;
}
