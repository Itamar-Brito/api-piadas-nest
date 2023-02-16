
import { IsOptional, IsString } from "class-validator";
import { Piada } from "../entities/piada.entity";

export class CreatePiadaDto extends Piada{

    @IsString()
    title: string;

    @IsString()
    joke: string;

    @IsOptional()
    @IsString()
    category?: string;
}
