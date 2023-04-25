import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, AuthUser } from '../../core/decorators';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return await this.authService.register(createUserDto);
  // }

  // @Auth([])
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
