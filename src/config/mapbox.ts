/**
 * Configuração do Mapbox para o Social Impact Express
 */

// Token de acesso da API Mapbox - Token pessoal para desenvolvimento e produção
export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGhpbGJpdHQxMSIsImEiOiJjbTd5cXZpNnAwZGY4MnNweXZ3aGd1MzhhIn0.AE07Q_1w6QObLaYrHd5k3Q';

// Verificar se o token está definido
if (!MAPBOX_ACCESS_TOKEN) {
  console.error('MAPBOX_ACCESS_TOKEN não definido! O mapa pode não funcionar corretamente.');
}

// Configurações padrão do mapa
export const DEFAULT_MAP_STYLE = 'mapbox://styles/mapbox/light-v11';
export const DEFAULT_CENTER = [-46.6333, -23.5505]; // São Paulo
export const DEFAULT_ZOOM = 11;

// Definição de cores para tipos de problemas
export const PROBLEM_TYPE_COLORS = {
  infrastructure: '#3498db', // Azul - Infraestrutura
  mobility: '#f39c12',      // Laranja - Mobilidade
  security: '#e74c3c',      // Vermelho - Segurança
  environmental: '#2ecc71', // Verde - Meio Ambiente
  publicservices: '#9b59b6', // Roxo - Serviços Públicos
  urbanoccupation: '#34495e', // Azul escuro - Ocupação Urbana
  accessibility: '#1abc9c',  // Verde água - Acessibilidade
  sanitation: '#95a5a6',    // Cinza - Saneamento
  urbancare: '#7f8c8d',     // Cinza escuro - Zeladoria
  social: '#e67e22',        // Laranja escuro - Problemas Sociais
  other: '#bdc3c7'          // Cinza claro - Outros
};

// Definição de emojis para tipos de problemas
export const PROBLEM_TYPE_EMOJIS = {
  infrastructure: '🏗️', // Infraestrutura
  mobility: '🚗',       // Mobilidade
  security: '🔒',       // Segurança
  environmental: '🌳',  // Meio Ambiente
  publicservices: '🏢', // Serviços Públicos
  urbanoccupation: '🏙️', // Ocupação Urbana
  accessibility: '♿',  // Acessibilidade
  sanitation: '🚿',     // Saneamento
  urbancare: '🧹',      // Zeladoria
  social: '👥',         // Problemas Sociais
  other: '📍'           // Outros
};

// Cores de severidade
export const SEVERITY_COLORS = {
  low: '#4cd137',       // Verde - Baixa severidade
  medium: '#ffed4a',    // Amarelo - Média severidade
  high: '#ff9f1a',      // Laranja - Alta severidade
  critical: '#ff3838'   // Vermelho - Crítica
};

// Funções de ajuda
export const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical' | string) => {
  return SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || SEVERITY_COLORS.low;
};

export const getProblemTypeColor = (type: string) => {
  return PROBLEM_TYPE_COLORS[type as keyof typeof PROBLEM_TYPE_COLORS] || PROBLEM_TYPE_COLORS.other;
};

export const getProblemTypeEmoji = (type: string) => {
  return PROBLEM_TYPE_EMOJIS[type as keyof typeof PROBLEM_TYPE_EMOJIS] || PROBLEM_TYPE_EMOJIS.other;
};

/**
 * Função para personalizar o mapa para visualização de problemas sociais
 * @param map Instância do mapa do Mapbox
 */
export const customizeMapForSocialProblems = (map: mapboxgl.Map) => {
  // Esconder pontos de interesse excessivos
  map.setLayoutProperty('poi-label', 'visibility', 'none');
  
  // Destacar áreas residenciais
  map.setPaintProperty('landuse-residential', 'fill-opacity', 0.8);
  
  // Adicionar controles de navegação
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
  return map;
};