import { Module } from '@nestjs/common';
import { TecnologiasService } from './tecnologias.service';
import { TecnologiasController } from './tecnologias.controller';

@Module({
  controllers: [TecnologiasController],
  providers: [TecnologiasService],
})
export class TecnologiasModule {}
