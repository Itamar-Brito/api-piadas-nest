import { Piada, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ImportPiadaService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async importAndShowPiadas() {
        try {
            this.importAndSavePiadas()
            this.checkAndUpdatePiadas()
            return {
                imported: 'success',
                ImportedJokes: await this.prisma.piada.findMany()
            };
        } catch (err) {
            return {
                imported: 'fail to import',
                error: err
            }
        }
        
    }

    async importAndSavePiadas(): Promise<void> {
        const { data } = await axios.get(
            'http://piada.atwebpages.com/php_action/api/get-piadas.php',
        );
        const piadas = this.convertToPiadaList(data);

        await this.updateDatabase(piadas);
    }

    private async updateDatabase(piadas: Prisma.PiadaUncheckedCreateInput[]): Promise<void> {
        for (const piada of piadas) {
            const existingPiada = await this.prisma.piada.findFirst({
                where: { title: piada.title },
            });
            if (existingPiada) {
                await this.prisma.piada.update({
                    where: { id: existingPiada.id },
                    data: piada,
                });
            } else {
                await this.prisma.piada.create({ data: piada });
            }
        }
    }

    private convertToPiadaList(data: any[]): Prisma.PiadaUncheckedCreateInput[] {
        return data.map((piada) => {
            return {
                title: piada.titulo,
                joke: piada.piada,
            };
        });
    }


    //ajustar
    async checkAndUpdatePiadas() {
        try {
            const savedPiadas = await this.prisma.piada.findMany();
            const { data } = await axios.get('http://piada.atwebpages.com/php_action/api/get-piadas.php');
            const apiPiadas = this.convertToPiadaList(data);
            
            for (const savedPiada of savedPiadas) {
                const apiPiada = apiPiadas.find(p => p.title === savedPiada.title);
                if (!apiPiada) {
                    await axios.get('http://piada.atwebpages.com/php_action/api/create-piada.php', {
                        params: {
                            'btn-cadastrar': true,
                            titulo: savedPiada.title,
                            piada: savedPiada.joke,
                            api: true
                        },
                        headers: {
                            'token': 'zJdDauhxKlsh629024971ee86'
                        }
                    });
                }
            }
            return { updated: 'success' };
        } catch (error) {
            return { updated: 'fail to update' };
        }
    }
    
}
