import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('secure')
@UseGuards(JwtAuthGuard)
export class SecureController {
  @Get()
  getSecureData() {
    return { message: 'This is secured data' };
  }
}
