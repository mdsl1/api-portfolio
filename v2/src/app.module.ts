import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { ProjetosModule } from './projetos/projetos.module';
import { TecnologiasModule } from './tecnologias/tecnologias.module';
import { MensagensModule } from './mensagens/mensagens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    SupabaseModule,
    ProjetosModule,
    TecnologiasModule,
    MensagensModule
  ],
})
export class AppModule {}
