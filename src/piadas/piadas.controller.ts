import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Response } from '@nestjs/common';
import { PiadasService } from './piadas.service';
import { CreatePiadaDto } from './dto/create-piada.dto';
import { UpdatePiadaDto } from './dto/update-piada.dto';
import { HttpStatusCode } from 'axios';

@Controller('/piadas')
export class PiadasController {

  constructor(
    private readonly piadasService: PiadasService
  ) { }

  @Get('sync')
  importPiadas() {
    return this.piadasService.importPiada()
  }

  @Post()
  create(@Body() createPiadaDto: CreatePiadaDto) {
    return this.piadasService.create(createPiadaDto);
  }

  @Get()
  findAll() {
    return this.piadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piadasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiadaDto: UpdatePiadaDto) {
    return this.piadasService.update(+id, updatePiadaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('pass') pass: string = '0', @Response() res) {
    try {
      const removed = await this.piadasService.remove(+id, pass)

      if (removed !== null) {
        return res.status(HttpStatusCode.Ok).json({
          success: true,
          deletedData: removed
        })
      }

      return res.status(HttpStatusCode.Unauthorized).json({
        success: false,
        message: 'Password Incorrect or item Not found'
      })
    } catch (error) {

      return res.status(HttpStatusCode.Unauthorized).json({
        success: false,
        message: error
      })

    }


  }


}
