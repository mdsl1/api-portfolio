import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagenDto } from './dto/create-mensagen.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('mensagens')
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  create(@Body() createMensagenDto: CreateMensagenDto) {
    return this.mensagensService.create(createMensagenDto);
  }
}