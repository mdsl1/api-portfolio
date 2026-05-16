import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength, IsUrl } from "class-validator";

export class CreateTecnologiaDto {

    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @MaxLength(100, { message: 'Nome muito longo.' })
    nome!: string;

    @IsString()
    @IsNotEmpty({ message: 'A descrição é obrigatório.' })
    @MaxLength(500, { message: 'Descrição muito longa' })
    descricao!: string;

    @IsUrl()
    @IsNotEmpty({ message: 'O icone é obrigatório.' })
    icone_tech!: string;

    @IsInt({ message: 'A ordem deve ser um número.' })
    @IsOptional()
    ordem?: number;
}
