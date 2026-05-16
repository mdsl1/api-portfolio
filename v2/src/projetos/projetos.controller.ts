import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';

@Controller('projetos')
export class ProjetosController {

  constructor(private readonly projetosService: ProjetosService) {}

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
