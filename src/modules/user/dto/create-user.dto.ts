import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// TODO, remove this class and use constructor's second argument's type

export class CreateUserDto{
  @ApiProperty()
  username: string;

  @ApiPropertyOptional()
  name: string;

}
