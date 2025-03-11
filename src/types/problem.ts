/**
 * Tipos relacionados a problemas reportados na plataforma
 */

// Categorias principais de problemas
export const PROBLEM_CATEGORIES = [
  'infrastructure',   // Infraestrutura
  'mobility',         // Mobilidade
  'security',         // Segurança
  'environmental',    // Meio Ambiente
  'publicservices',   // Serviços Públicos
  'urbanoccupation',  // Ocupação Urbana
  'accessibility',    // Acessibilidade
  'sanitation',       // Saneamento
  'urbancare',        // Zeladoria
  'social',           // Problemas Sociais
  'other'             // Outros
] as const;

// Definição do tipo para categorias de problemas
export type ProblemCategory = typeof PROBLEM_CATEGORIES[number];

// Tipos de severidade
export const SEVERITY_LEVELS = [
  'critical',  // Crítico - Perigo imediato, risco à vida
  'high',      // Alto - Risco significativo, requer atenção imediata
  'medium',    // Médio - Problema significativo, mas não urgente
  'low'        // Baixo - Problema menor, pode ser resolvido em tempo normal
] as const;

// Definição do tipo para níveis de severidade
export type SeverityLevel = typeof SEVERITY_LEVELS[number];

// Subtipos de problemas por categoria
export const PROBLEM_SUBTYPES: Record<ProblemCategory, string[]> = {
  'infrastructure': [
    'potholes',           // Buracos nas ruas e calçadas
    'streetlights',       // Iluminação pública defeituosa
    'trafficsignals',     // Semáforos com mau funcionamento
    'streetsigns',        // Placas de rua danificadas ou ausentes
    'crosswalks',         // Faixas de pedestres apagadas
    'busstops',           // Pontos de ônibus danificados
    'drains',             // Bueiros entupidos ou quebrados
    'leaks',              // Vazamentos de água ou esgoto
    'electricalwires',    // Fiação elétrica exposta
    'damagedpoles',       // Postes danificados
    'other'               // Outros problemas de infraestrutura
  ],
  'mobility': [
    'traffic',            // Congestionamentos
    'accidents',          // Acidentes de trânsito
    'roadblocks',         // Obras e bloqueios de vias
    'crowdedtransport',   // Transportes públicos lotados
    'busdelays',          // Atrasos em linhas de ônibus/metrô
    'bikelaneobtruction', // Ciclovias obstruídas
    'sidewalkblocks',     // Calçadas bloqueadas
    'illegalparking',     // Estacionamento irregular
    'flooding',           // Pontos de alagamento
    'other'               // Outros problemas de mobilidade
  ],
  'security': [
    'poorlighting',       // Áreas com iluminação precária
    'robberyspots',       // Pontos de assaltos frequentes
    'brokencameras',      // Câmeras de segurança quebradas
    'druguse',            // Locais com consumo de drogas
    'vandalism',          // Vandalismos
    'landslideareas',     // Áreas de risco de deslizamento
    'violence',           // Locais com violência frequente
    'vehicletheft',       // Roubos de veículos
    'pedestriantheft',    // Furtos a pedestres
    'harassment',         // Assédio nas ruas
    'robbery',            // Assalto
    'other'               // Outros problemas de segurança
  ],
  'environmental': [
    'illegaldumping',     // Descarte irregular de lixo
    'noisepollution',     // Poluição sonora
    'airpollution',       // Poluição do ar
    'fires',              // Queimadas
    'fallingtrees',       // Árvores em risco de queda
    'deforestation',      // Áreas de desmatamento
    'waterpollution',     // Poluição de rios e córregos
    'badodor',            // Mau cheiro
    'abandonedanimals',   // Animais abandonados
    'urbanpests',         // Pragas urbanas
    'other'               // Outros problemas ambientais
  ],
  'publicservices': [
    'irregulartrash',     // Coleta de lixo irregular
    'wateroutage',        // Falta de água
    'poweroutage',        // Queda de energia
    'nopublicinternet',   // Falta de internet pública
    'damagedequipment',   // Equipamentos públicos danificados
    'servicedelays',      // Demora em atendimentos
    'hospitalproblems',   // Problemas em hospitais/postos
    'schoolproblems',     // Escolas com problemas estruturais
    'parkupkeep',         // Parques mal conservados
    'closedcenters',      // Centros comunitários fechados
    'other'               // Outros problemas de serviços públicos
  ],
  'urbanoccupation': [
    'irregularconstruction', // Construções irregulares
    'publicareainvasion',    // Invasões de áreas públicas
    'sidewalkvendors',       // Calçadas ocupadas por ambulantes
    'nolicense',             // Estabelecimentos sem alvará
    'illegalsigns',          // Propaganda irregular
    'graffiti',              // Pichações
    'riskoccupations',       // Ocupações de risco
    'illegallanduse',        // Uso irregular do solo
    'noise',                 // Barulho excessivo
    'disturbance',           // Perturbação do sossego
    'other'                  // Outros problemas de ocupação urbana
  ],
  'accessibility': [
    'noramps',              // Falta de rampas de acesso
    'wheelchairobstacles',  // Obstáculos para cadeirantes
    'notactilesurface',     // Calçadas sem piso tátil
    'brokenelevators',      // Elevadores quebrados
    'noaudiosignals',       // Ausência de sinais sonoros
    'narrowdoors',          // Portas estreitas
    'noadaptedbathrooms',   // Banheiros não adaptados
    'inadequatetransport',  // Transporte adaptado insuficiente
    'nospecialspots',       // Falta de vagas especiais
    'inadequatefurniture',  // Mobiliário urbano inadequado
    'other'                 // Outros problemas de acessibilidade
  ],
  'sanitation': [
    'opensewage',           // Esgoto a céu aberto
    'standingwater',        // Água parada
    'denguespots',          // Focos de dengue
    'accumulatedtrash',     // Lixo acumulado
    'urbanpests',           // Pragas urbanas
    'odors',                // Mau cheiro
    'flooding',             // Enchentes
    'poordrainage',         // Drenagem insuficiente
    'irregularseptic',      // Fossas irregulares
    'watercontamination',   // Contaminação de água
    'other'                 // Outros problemas de saneamento
  ],
  'urbancare': [
    'highgrass',            // Mato alto em terrenos
    'poorstreetcleaning',   // Limpeza urbana deficiente
    'squaremaintenance',    // Manutenção de praças
    'needstreepruning',     // Poda de árvores necessária
    'damagedtrashcans',     // Lixeiras danificadas
    'wornpaint',            // Pinturas desgastadas
    'brokenequipment',      // Equipamentos quebrados
    'vandalizedmonuments',  // Monumentos vandalizados
    'poorgardens',          // Jardins mal cuidados
    'damagedfurniture',     // Mobiliário urbano danificado
    'other'                 // Outros problemas de zeladoria
  ],
  'social': [
    'homelessness',         // Moradores em situação de rua
    'drugusersareas',       // Áreas de concentração de usuários de drogas
    'childlabor',           // Trabalho infantil
    'sexualexploitation',   // Exploração sexual
    'forcedbegging',        // Mendicância forçada
    'elderlabandonment',    // Abandono de idosos
    'vulnerablepopulation', // População vulnerável
    'extremepoverty',       // Áreas de extrema pobreza
    'drugtrafficking',      // Tráfico de drogas
    'other'                 // Outros problemas sociais
  ],
  'other': ['other']        // Outros tipos de problemas
};

// Tipo de localização
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

// Interface principal de problemas
export interface Problem {
  id: string | number;
  title: string;
  description: string;
  type: ProblemCategory;
  subtype?: string; // Subtipo específico de problema dentro da categoria
  severity: SeverityLevel;
  location?: Location;
  images?: string[];
  videos?: string[];
  author?: {
    id: string | number;
    name: string;
    avatar?: string;
    username?: string;
  };
  createdAt?: Date | string | number;
  status?: 'pending' | 'in_progress' | 'resolved' | 'closed';
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  verified?: boolean;
  upvotes?: number; // Número de pessoas que confirmaram o problema
}

// Interface para formulário de reporte de problemas
export interface ProblemFormData {
  title: string;
  description: string;
  type: ProblemCategory;
  subtype?: string;
  severity: SeverityLevel;
  location?: Location;
  images?: File[];
  videos?: File[];
}

// Função para obter os subtipos de uma categoria
export const getSubtypesByCategory = (category: ProblemCategory): string[] => {
  return PROBLEM_SUBTYPES[category] || [];
};

// Versão alternativa que aceita string e faz validação
export const getSubtypesByCategoryString = (category: string): string[] => {
  if (PROBLEM_CATEGORIES.includes(category as ProblemCategory)) {
    return PROBLEM_SUBTYPES[category as ProblemCategory] || [];
  }
  return [];
};

// Mapear palavras-chave para severidade para uso no algoritmo de detecção automática
export const SEVERITY_KEYWORDS = {
  critical: [
    'emergência', 'perigo', 'morte', 'grave', 'urgente', 'incêndio', 'desabamento', 
    'inundação', 'enchente', 'desmoronamento', 'risco de vida', 'acidente grave',
    'desastre', 'explosão', 'eletrocussão', 'esgoto', 'contaminação', 'feridos',
    'roubo', 'assalto', 'agressão', 'violência', 'arma', 'sequestro', 'estupro'
  ],
  high: [
    'saúde', 'segurança', 'violência', 'acidente', 'falta', 'roubo', 'assalto',
    'queda', 'bloqueio', 'buraco grande', 'curto circuito', 'fios', 'choque', 
    'trânsito parado', 'sem água', 'sem energia', 'semáforo quebrado',
    'alagamento', 'deslizamento', 'obstrução'
  ],
  medium: [
    'problema', 'dificuldade', 'manutenção', 'quebrado', 'buraco', 'lixo', 
    'iluminação', 'entupido', 'mau funcionamento', 'barulho', 'poluição',
    'deteriorado', 'lento', 'atrasado', 'irregular', 'pichação', 'mato',
    'abandono', 'danificado', 'mal conservado'
  ],
  low: [
    'sugestão', 'melhoria', 'pequeno', 'leve', 'estética', 'pintura', 'embelezamento',
    'desgastado', 'sinalização', 'aviso', 'informação', 'placa', 'faixa apagada',
    'ajuste', 'verificação', 'atenção', 'monitoramento', 'orientação'
  ]
};