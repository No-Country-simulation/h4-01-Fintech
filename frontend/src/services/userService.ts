'use server'

import {prisma} from '@/db/ConnectPrisma';

export interface UserData  {
    dni: string;
    name:string;
    role:string;
    risk_percentage:number;
}

export const getUSer = async (userId:string) => {
    const resp = await prisma.users.findFirst({
        where:{id: userId}
    });
    return resp as unknown as UserData;
}