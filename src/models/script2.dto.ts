import { ScriptDTO } from "./script.dto";

export interface Script2DTO{
    id: string;
    alunoId: string;
    instrutorId: string;
    aluno: any;
    instrutor:any;
    itens: any[];
    atividade: any;
    nome: any;
    ativo: any;
    qtd_rep: any,
    qtd_series: any,
    diasemana: any;
}

export interface Content{
    content: Script2DTO[];
}