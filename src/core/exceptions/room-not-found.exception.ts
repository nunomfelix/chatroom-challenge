import { NotFoundException } from '@nestjs/common';

export class RoomNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.roomNotFound', error);
  }
}
