import { Prisma } from "@prisma/client";

export class Piada implements Prisma.PiadaUncheckedCreateInput{
    id?: number;
    title: string;
    joke?: string;
    category?: string;
}
