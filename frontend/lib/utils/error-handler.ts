import { AxiosError } from "axios";

async function tratarErro(error: AxiosError) {
    console.log(error);
    if(error.response){ //para requisição que foi válida, mas deu erro no response
        if(Array.isArray(error.response.data)){
            return Promise.reject(error.response.data);
        }
        return Promise.reject([error.response.data]);
    } else if(error.request) { //para requisição inválida
        return Promise.reject([{ severity: 'danger', summary: 'Erro ao enviar requisição', detail: error.message }]);
    }
    return Promise.reject([{ severity: 'danger', summary: 'Erro', detail: error.message }]);
}

export default tratarErro;