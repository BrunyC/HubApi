import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
require('dotenv').config();

const pathToProto = join(__dirname, 'manager.proto')
const grpcUrlConn = process.env.GRPC_CONNECTION_USERS_URL || 'localhost:3000'
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.GRPC,
        options: {
          package: 'manager',
          protoPath: pathToProto,
          url: grpcUrlConn,
          keepalive: {
            keepaliveTimeoutMs: 7000
          }
        },
      },
    ]),
    HttpModule
  ],
  controllers: [ContatosController],
  providers: [ContatosService],
  exports: [ContatosService]
})
export class ContatoModule {}
