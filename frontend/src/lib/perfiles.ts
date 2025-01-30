// Data Perfiles

type Perfil = 'Conservador' | 'Moderado' | 'Agresivo' | 'No Definido' | 'Error'

export const determinarPerfil = (riskPercentage: number | null): Perfil => {
  if (riskPercentage === null || riskPercentage < 1 || riskPercentage > 10) {
    return 'No Definido' // Valor fuera de rango o nulo
  }

  if (riskPercentage >= 7) {
    return 'Conservador'
  } else if (riskPercentage >= 4) {
    return 'Moderado'
  } else {
    return 'Agresivo'
  }
}

// mensaje

export const obtenerMensaje = (perfil: Perfil): string => {
  switch (perfil) {
    case 'Conservador':
      return 'Prefiere inversiones seguras y resultados estables. Ejemplo de opciones: plazos fijos, bonos gubernamentales, fondos conservadores. Riesgo Moderado.'
    case 'Moderado':
      return 'Prefiere un equilibrio entre riesgo y rentabilidad. Ejemplo de opciones: fondos mixtos, acciones de empresas estables, ETFs. Riesgo Medio.'
    case 'Agresivo':
      return 'Prefiere inversiones de alto riesgo con potencial de alta rentabilidad. Ejemplo de opciones: criptomonedas, acciones de crecimiento, startups. Riesgo Alto.'
    case 'No Definido':
      return 'Por favor, completa la encuesta para poder ofrecerte recomendaciones personalizadas.'
    case 'Error':
      return 'Hubo un error al calcular tu perfil de inversión. Por favor, verifica tus respuestas.'
    default:
      return 'Perfil no reconocido.'
  }
}