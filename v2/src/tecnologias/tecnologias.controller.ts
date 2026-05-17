import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TecnologiasService } from './tecnologias.service';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiKeyGuard } from '../auth/api-key/api-key.guard';

@Controller('tecnologias')
export class TecnologiasController {
  
  constructor(private readonly tecnologiasService: TecnologiasService) {}

  @UseGuards(ApiKeyGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post()
  create(@Body() createTecnologiaDto: CreateTecnologiaDto) {
    return this.tecnologiasService.create(createTecnologiaDto);
  }

  @Get()
  findAll() {
    return this.tecnologiasService.findAll();
  }

  /* ... Resto do CRUD será feito futuramente ... */
}