import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMensagenDto } from './dto/create-mensagen.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class MensagensService {

  constructor(
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService
  ) {}

  async create(createMensagenDto: CreateMensagenDto) {
    const cleanData = {
      ...createMensagenDto,
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

    const n8nUrl = this.configService.getOrThrow<string>("N8N_WEBHOOK_URL");
    const timestamp = new Date();
    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nome: cleanData.nome, 
        email: cleanData.email,
        assunto: cleanData.assunto,
        mensagem: cleanData.mensagem,        
        timestamp 
      })
    });

    if (!n8nResponse.ok)
    {
      throw new InternalServerErrorException("Ocorreu um erro ao enviar o formulário para o n8n.");
    }

    return data || { message: 'Mensagem enviada com sucesso!' };
  }
}