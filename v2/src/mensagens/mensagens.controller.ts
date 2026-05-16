import { Controller, Post, Body } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagenDto } from './dto/create-mensagen.dto';

@Controller('mensagens')
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  @Post()
  create(@Body() createMensagenDto: CreateMensagenDto) {
    return this.mensagensService.create(createMensagenDto);
  }
}
