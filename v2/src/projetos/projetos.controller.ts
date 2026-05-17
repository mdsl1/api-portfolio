import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiKeyGuard } from '../auth/api-key/api-key.guard';

@Controller('projetos')
export class ProjetosController {

  constructor(private readonly projetosService: ProjetosService) {}

  @UseGuards(ApiKeyGuard)
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  @Post()
  async create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetosService.create(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetosService.findAll();
  }

    /* ... Resto do CRUD será feito futuramente ... */

}