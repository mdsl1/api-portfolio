import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecnologiasService } from './tecnologias.service';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';

@Controller('tecnologias')
export class TecnologiasController {
  
  constructor(private readonly tecnologiasService: TecnologiasService) {}

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
