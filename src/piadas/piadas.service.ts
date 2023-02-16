import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportPiadaService } from 'src/import-piada/import-piada.service';
import { CreatePiadaDto } from './dto/create-piada.dto';
import { UpdatePiadaDto } from './dto/update-piada.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PiadasService {

private deletePassHash = '$2b$05$dEpHsE5CviPGrKiRY7ntne0JeRqQInwKR4tWwQ7MonZCf7/e8cmWi'

constructor (
  private readonly prisma: PrismaService,
  private readonly importPiadaService: ImportPiadaService,
  ){}

  async create(data: CreatePiadaDto) {
    return await this.prisma.piada.create({ data })
  }

  async findAll() {
    return await this.prisma.piada.findMany();
  }

  async findOne(id: number) {
    return await await this.prisma.piada.findUnique({
      where: {
        id,
      },
    });;
  }

  async update(id: number, data: UpdatePiadaDto) {
    return await this.prisma.piada.update({
      where: {id},
      data
    });
  }

  async remove(id: number, pass: any) {
    const isCorrectPass = await bcrypt.compare(pass, this.deletePassHash)

    console.log(isCorrectPass)

    if(!isCorrectPass){
      return null
    }

    return await this.prisma.piada.delete({
      where:{ id }
    });
  }

  async importPiada(){
     return await this.importPiadaService.importAndShowPiadas()
  }
}
