import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { SupabaseService } from '../supabase/supabase.service';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class ProjetosService {

  constructor(private readonly supabase: SupabaseService) {}

  async create(createProjetoDto: CreateProjetoDto) {

    const cleanData = {
      ...createProjetoDto,
      titulo: sanitizeHtml(createProjetoDto.titulo),
      tipo: sanitizeHtml(createProjetoDto.tipo),
      img: sanitizeHtml(createProjetoDto.img || 'Midias/Projetos/WorkInProgress.png'),
      descricao: sanitizeHtml(createProjetoDto.descricao),
      github_url: sanitizeHtml(createProjetoDto.github_url),
      site_url: sanitizeHtml(createProjetoDto.site_url || 'n/a'),
    };

    const { data, error } = await this.supabase.client.rpc(
      'inserir_projeto',
      cleanData
    );

    if(error) {
      throw new InternalServerErrorException(`Erro Supabase RPC: ${ error.message }`);
    }

    return data || { message: 'Projeto inserido com sucesso!' };
  }

  async findAll() {
    const { data, error } = await this.supabase.client
      .from('view_projetos_completos')
      .select('*')
      .order('ordem', { ascending: true });

    if(error) {
      throw new InternalServerErrorException(`Erro Supabase GET: ${ error.message }`);
    }
    
    return data;
  }

  /* ... Resto do CRUD será feito futuramente ... */
}