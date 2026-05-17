import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { SupabaseService } from '../supabase/supabase.service';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class TecnologiasService {

  constructor(private readonly supabase: SupabaseService) {}

  async create(createTecnologiaDto: CreateTecnologiaDto) {

    const cleanData = {
      ...createTecnologiaDto,
      nome: sanitizeHtml(createTecnologiaDto.nome),
      descricao: sanitizeHtml(createTecnologiaDto.descricao),
      icone_tech: sanitizeHtml(createTecnologiaDto.icone_tech)
    };

    const { data, error } = await this.supabase.client
      .from('tecnologias')
      .insert([ cleanData ])
      .select();

    if(error) {
      throw new InternalServerErrorException(`Erro Supabase Insert: ${ error.message }`);
    }

    return {
      message: 'Tecnologia inserida com sucesso.',
      data: data[0]
    };
    
  }

  async findAll() {
    
    const { data, error } = await this.supabase.client
      .from('tecnologias')
      .select('*')
      .order('ordem', { ascending: true });

    if(error) {
      throw new InternalServerErrorException(`Erro Supabase GET: ${ error.message }`);
    }

    return data;
  }

  /* ... Resto do CRUD será feito futuramente ... */
}