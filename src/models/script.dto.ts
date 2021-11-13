export interface ScriptDTO{
    aluno:any;
    instrutor:any;
    itens: any[];
    ativo: any;
}

export interface Aluno{
    id:any;
    nome:any;
}

export interface Instrutor{
    id:any;
    nome:any;
}

export interface Content{
    content: ScriptDTO[];
}