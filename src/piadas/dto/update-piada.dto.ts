import { PartialType } from '@nestjs/mapped-types';
import { CreatePiadaDto } from './create-piada.dto';

export class UpdatePiadaDto extends PartialType(CreatePiadaDto) {}
