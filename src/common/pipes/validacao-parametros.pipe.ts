import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform{
    transform(value:any, metadata: ArgumentMetadata){
       if(!value){
           throw new BadRequestException(`informe o valor do parametro ${metadata.data}`);
       }
        return value
    }
}