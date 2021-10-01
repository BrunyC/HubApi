import { Injectable } from "@nestjs/common";

@Injectable()
export class LoadData {
    private indexElastic = process.env.INDEX_ELASTIC
    private date = new Date().toLocaleString()

    loadGetData(request, id) {
        var newData = {}
        if(id !== null) {
            newData['id_cpf_cnpj'] = id
        }
        newData['header'] = request._header
        newData['method'] = request.method
        newData['path'] = request.path
        newData['created'] = this.date
        newData['index'] = this.indexElastic
        return newData
    }

}