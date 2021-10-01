import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ApiTags } from '@nestjs/swagger';
import { consoleLog } from 'src/utils';

@ApiTags('Contatos')
@Controller('contatos')
export class ContatosController {

    constructor(
        private readonly contatosService: ContatosService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarContato(
    @Body() data): Promise<any> {
        try {
            data['source_transaction'] = 'contatos'
            await this.contatosService.MainService(data)
        } catch (error) {
            consoleLog('error', error)
            return { status: false, error: error }
        }
    }
}

