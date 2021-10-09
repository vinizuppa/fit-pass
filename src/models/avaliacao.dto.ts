import { AlunoDTO } from "./aluno.dto";
import { InstrutorDTO } from "./instrutor.dto";

export interface AvaliacaoDTO{
    id : string;
    obs : string;
    altura : number;
    peso: number;
    imc: number;
    alunoId: string;
    instrutorId: string;
    aluno: any;
    instrutor: any;
}