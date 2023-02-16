import { Module } from '@nestjs/common';
import { PiadasService } from './piadas.service';
import { PiadasController } from './piadas.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ImportPiadaService } from 'src/import-piada/import-piada.service';

@Module({
  controllers: [PiadasController],
  providers: [PiadasService, PrismaService, ImportPiadaService]
})
export class PiadasModule {}

