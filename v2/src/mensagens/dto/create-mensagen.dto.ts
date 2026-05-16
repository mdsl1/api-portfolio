import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMensagenDto {

    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @MaxLength(300, { message: 'Nome muito longo.' })
    nome!: string;

    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    @MaxLength(100, { message: 'E-mail muito longo.' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'O assunto é obrigatório.' })
    @MaxLength(250, { message: 'Assunto muito longo.' })
    assunto!: string;

    @IsString()
    @IsNotEmpty({ message: 'A mensagem é obrigatória.' })
    mensagem!: string; 
}
