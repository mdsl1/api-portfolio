import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMensagenDto } from './dto/create-mensagen.dto';
import { SupabaseService } from '../supabase/supabase.service';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class MensagensService {

  constructor(private readonly supabase: SupabaseService) {}

  async create(createMensagenDto: CreateMensagenDto) {
    const cleanData = {
      ...CreateMensagenDto,
      nome: sanitizeHtml(createMensagenDto.nome),
      email: sanitizeHtml(createMensagenDto.email),
      assunto: sanitizeHtml(createMensagenDto.assunto),
      mensagem: sanitizeHtml(createMensagenDto.mensagem)
    };

    const { data, error } = await this.supabase.client.rpc(
      'inserir_msg_form',
      cleanData
    );

    if(error) {
      throw new InternalServerErrorException(`Erro Supabase RPC: ${ error.message }`);
    }

    return data || { message: 'Mensagem enviada com sucesso!' };
  }
}