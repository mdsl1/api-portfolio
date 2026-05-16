import { IsNotEmpty, IsString, MaxLength, IsIn, IsOptional, IsArray, IsUrl, Validate, isURL } from "class-validator";

export class CreateProjetoDto {

    @IsString()
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    @MaxLength(100, { message: 'Título muito longo.' })
    titulo!: string;

    @IsString()
    @IsNotEmpty({ message: 'O tipo é obrigatório.' })
    @IsIn(['backend', 'frontend', 'fullstack', 'logica', 'automacao', 'desktop', 'mobile'], { message: 'Tipo inválido.' })
    tipo!: string;

    @IsString()
    @IsOptional()
    img?: string;

    @IsString()
    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    @MaxLength(1000, {message: 'Descrição muito longa.'})
    descricao!: string;

    @IsArray({ message: 'Tecnologias devem ser passadas por array de IDs.' })
    tecnologia_ids!: number[];

    @IsArray({ message: 'Adaptações devem ser passadas por array de IDs.' })
    @IsOptional()
    adaptacao_ids?: number[];

    @IsUrl()
    @IsNotEmpty({ message: 'A URL do repositório do Github é obrigatória.' })
    github_url!: string;
    
    @IsUrl()
    @IsOptional()
    site_url?: string;
}