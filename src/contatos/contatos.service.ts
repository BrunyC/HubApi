import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { consoleLog } from 'src/utils';
import { v4uuid } from 'src/utils';
import jwt_decode from "jwt-decode";
import { ClientGrpc } from '@nestjs/microservices';
import { UsersService } from './interfaces/users-find.interface';
@Injectable()
export class ContatosService {

    private users: UsersService;
    
    constructor(
        @Inject('USERS') private readonly client: ClientGrpc,
    ) {}

    onModuleInit() {
        this.users = this.client.getService<UsersService>('UsersService');
      }


    async decodeJwt(jwt) {
        var decoded
        try {
            decoded = jwt_decode(jwt)
        }catch (error) {
            throw new BadRequestException('JWT inválido.');
        }
        return decoded
    }
    
    async MainService(data) {
        var finduser
        const context = data.source_transaction
        const uuid = v4uuid
        data['id_transaction'] = uuid
        const user = await this.decodeJwt(data.jwt)
        try {
            finduser = await this.getOne(user.sub, uuid, context)
        } catch (error) {
            consoleLog('error', error)
        }
    }

    async getOne(id, uuid, context) {
        try {
            return await this.users.findOne({ id: id, idTransaction: uuid, context: context }).toPromise()
        } catch (error) {
            consoleLog('error', error)
            throw error
        }
    }

}
