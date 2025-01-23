// pages/api/save-investment-profile.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { answers } = req.body
    console.log('Respuestas recibidas:', answers)
    // Aquí podrías guardar las respuestas en una base de datos
    res.status(200).json({ message: 'Perfil guardado exitosamente' })
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
