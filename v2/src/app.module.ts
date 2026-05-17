import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { ProjetosModule } from './projetos/projetos.module';
import { TecnologiasModule } from './tecnologias/tecnologias.module';
import { MensagensModule } from './mensagens/mensagens.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 5
    }]),
    SupabaseModule,
    ProjetosModule,
    TecnologiasModule,
    MensagensModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}