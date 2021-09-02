export interface AlunoDTO{
    id  : string;
    nome : string;
    email : string;
    biotipo: string;
    sexo: string;
    peso: number;
    altura: number;
    imc: number;
    data_nasc: string;
    data_cad: string;
    imageUrl? : string;

}