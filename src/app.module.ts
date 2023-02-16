import { Module } from '@nestjs/common';
import { PiadasModule } from './piadas/piadas.module';

@Module({
  imports: [
    PiadasModule
  ],
})
export class AppModule {}
