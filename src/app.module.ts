import { Module } from '@nestjs/common';
import { ContatoModule } from './contatos/contatos.module';

@Module({
  imports: [
    ContatoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
