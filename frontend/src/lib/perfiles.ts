// Definición de los perfiles de inversión
type Perfil = 
  | 'Ultraconservador' // 0-1
  | 'Conservador' // 2-3
  | 'Moderado' // 4-5
  | 'Equilibrado' // 6
  | 'Arriesgado' // 7-8
  | 'Agresivo' // 9
  | 'Extremadamente Agresivo' // 10
  | 'No Definido' // Error o valores fuera de rango

// Función para determinar el perfil según el porcentaje de riesgo
export const determinarPerfil = (riskPercentage: number | null): Perfil => {
  if (riskPercentage === null || riskPercentage < 0 || riskPercentage > 10) {
    return 'No Definido'; // Valor fuera de rango o nulo
  }

  if (riskPercentage <= 1) return 'Ultraconservador';
  if (riskPercentage <= 3) return 'Conservador';
  if (riskPercentage <= 5) return 'Moderado';
  if (riskPercentage === 6) return 'Equilibrado';
  if (riskPercentage <= 8) return 'Arriesgado';
  if (riskPercentage === 9) return 'Agresivo';
  if (riskPercentage === 10) return 'Extremadamente Agresivo';

  return 'No Definido';
};

// Función para obtener un mensaje según el perfil determinado
export const obtenerMensaje = (perfil: Perfil): string => {
  switch (perfil) {
    case 'Ultraconservador':
      return 'Prefieres máxima seguridad en tus inversiones, evitando cualquier tipo de riesgo. Opciones recomendadas: depósitos a plazo fijo, bonos gubernamentales con garantía alta. Riesgo mínimo.';
    
    case 'Conservador':
      return 'Buscas estabilidad y seguridad en tus inversiones, aunque aceptas un riesgo mínimo. Opciones recomendadas: bonos corporativos, fondos de renta fija y plazos fijos con mejores tasas. Riesgo bajo.';
    
    case 'Moderado':
      return 'Buscas equilibrio entre riesgo y rentabilidad, aceptando cierta volatilidad en el mercado. Opciones recomendadas: fondos mixtos, bonos con más rentabilidad, acciones de empresas sólidas. Riesgo moderado.';
    
    case 'Equilibrado':
      return 'Tienes un perfil balanceado y estás dispuesto a asumir riesgos controlados para obtener mejores rendimientos. Opciones recomendadas: ETFs diversificados, acciones blue-chip, bonos de mediano plazo. Riesgo medio.';
    
    case 'Arriesgado':
      return 'Prefieres asumir más riesgo a cambio de mayor rentabilidad, aceptando fluctuaciones en el mercado. Opciones recomendadas: acciones de crecimiento, fondos sectoriales, criptomonedas con respaldo. Riesgo alto.';
    
    case 'Agresivo':
      return 'Buscas maximizar ganancias sin importar la volatilidad, invirtiendo en activos de alto riesgo. Opciones recomendadas: criptomonedas volátiles, startups tecnológicas, trading activo. Riesgo muy alto.';
    
    case 'Extremadamente Agresivo':
      return 'Estás dispuesto a asumir el riesgo más alto posible en busca de rendimientos extraordinarios, aunque con alta probabilidad de pérdidas significativas. Opciones recomendadas: especulación en criptomonedas, inversiones en empresas emergentes sin historial. Riesgo extremo.';
    
    case 'No Definido':
      return 'Por favor, completa la encuesta correctamente para poder ofrecerte recomendaciones personalizadas.';
    
    default:
      return 'Perfil no reconocido.';
  }
};
