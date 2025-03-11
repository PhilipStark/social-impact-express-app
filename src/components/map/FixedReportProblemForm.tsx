import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  AlertTriangle, X, MapPin, Camera, Video, 
  Info, HelpCircle, Construction, Shield, Trees, 
  Bus, Building, HeartPulse, GraduationCap, 
  Compass, Check, Home, 
  Accessibility, 
  Droplet, PaintBucket, 
  Users, Package
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  PROBLEM_CATEGORIES, PROBLEM_SUBTYPES, 
  getSubtypesByCategoryString, // Usando a versão que aceita string
  SEVERITY_KEYWORDS,
  type ProblemCategory, // Importando o tipo apropriado
  type SeverityLevel
} from '../../types/problem';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ReportProblemFormProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  initialLocation?: { latitude: number; longitude: number; address?: string };
}

const FixedReportProblemForm: React.FC<ReportProblemFormProps> = ({
  onClose,
  onSubmit,
  onCancel,
  initialLocation
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<string>(''); // Usando string para compatibilidade
  const [subtype, setSubtype] = useState('');
  const [location, setLocation] = useState(
    initialLocation ? 
    `${initialLocation.latitude.toFixed(6)}, ${initialLocation.longitude.toFixed(6)}${initialLocation.address ? ` - ${initialLocation.address}` : ''}` : 
    '-23.5505, -46.6333 - Centro de São Paulo'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  // Estado para exibir exemplos e descrições das categorias
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    setSubtype('');
  }, [type]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideo(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const determineAutomaticSeverity = (title: string, description: string): SeverityLevel => {
    const text = (title + ' ' + description).toLowerCase();
    
    if (SEVERITY_KEYWORDS.critical.some(word => text.includes(word))) {
      return 'critical';
    } else if (SEVERITY_KEYWORDS.high.some(word => text.includes(word))) {
      return 'high';
    } else if (SEVERITY_KEYWORDS.medium.some(word => text.includes(word))) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || !location) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      let latitude, longitude, address;
      const locationMatch = location.match(/([\d.-]+),\s*([\d.-]+)(?:\s*-\s*(.+))?/);
      
      if (locationMatch) {
        latitude = parseFloat(locationMatch[1]);
        longitude = parseFloat(locationMatch[2]);
        address = locationMatch[3];
      } else {
        throw new Error('Formato de localização inválido');
      }

      const severity = determineAutomaticSeverity(title, description);

      const formData = {
        title,
        description,
        type: type as ProblemCategory, // Cast explícito para o tipo correto
        subtype: subtype || undefined,
        severity,
        location: {
          latitude,
          longitude,
          address,
          coordinates: [longitude, latitude]
        },
        images: image ? [image] : undefined,
        videos: video ? [video] : undefined
      };

      setTimeout(() => {
        if (onSubmit) {
          onSubmit(formData);
        }

        toast.success('Problema reportado com sucesso!');
        setIsSubmitting(false);
        
        setTitle('');
        setDescription('');
        setType('');
        setSubtype('');
        setImage(null);
        setVideo(null);
        
        if (onClose) onClose();
      }, 1000);
    } catch (error) {
      console.error('Erro ao enviar relatório:', error);
      toast.error(`Erro ao enviar relatório: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setIsSubmitting(false);
    }
  };

  const renderLocationMap = () => {
    return (
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <div className="bg-gray-100 p-2 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">Selecione a localização no mapa</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowLocationMap(false)}
          >
            <X size={16} />
          </Button>
        </div>
        <div className="h-[300px] bg-blue-50 flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-2" size={32} />
            <p className="text-sm text-gray-600">Clique no mapa para marcar a localização</p>
            <p className="text-xs text-gray-500 mt-1">Arraste o mapa para navegar</p>
          </div>
          <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500" size={32} />
        </div>
        <div className="p-2 bg-gray-50">
          <Button 
            className="w-full" 
            onClick={() => {
              setLocation('-23.5505, -46.6333 - Localização selecionada no mapa');
              setShowLocationMap(false);
            }}
          >
            Confirmar localização
          </Button>
        </div>
      </div>
    );
  };

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'infrastructure': return Construction;
      case 'mobility': return Bus;
      case 'security': return Shield;
      case 'environmental': return Trees;
      case 'publicservices': return Building;
      case 'urbanoccupation': return Home;
      case 'accessibility': return Accessibility;
      case 'sanitation': return Droplet;
      case 'urbancare': return PaintBucket;
      case 'social': return Users;
      default: return Package;
    }
  };

  const getCategoryLabel = (categoryId: string) => {
    switch(categoryId) {
      case 'infrastructure': return 'Infraestrutura';
      case 'mobility': return 'Mobilidade';
      case 'security': return 'Segurança';
      case 'environmental': return 'Meio Ambiente';
      case 'publicservices': return 'Serviços Públicos';
      case 'urbanoccupation': return 'Ocupação Urbana';
      case 'accessibility': return 'Acessibilidade';
      case 'sanitation': return 'Saneamento';
      case 'urbancare': return 'Zeladoria';
      case 'social': return 'Problemas Sociais';
      default: return 'Outros';
    }
  };

  const getSubtypeLabel = (subtypeId: string) => {
    const labels: Record<string, string> = {
      'potholes': 'Buracos nas ruas e calçadas',
      'streetlights': 'Iluminação pública defeituosa',
      'trafficsignals': 'Semáforos com mau funcionamento',
      'streetsigns': 'Placas de rua danificadas ou ausentes',
      'crosswalks': 'Faixas de pedestres apagadas',
      'busstops': 'Pontos de ônibus danificados',
      'drains': 'Bueiros entupidos ou quebrados',
      'leaks': 'Vazamentos de água ou esgoto',
      'electricalwires': 'Fiação elétrica exposta',
      'damagedpoles': 'Postes danificados',
      'traffic': 'Congestionamentos',
      'accidents': 'Acidentes de trânsito',
      'roadblocks': 'Obras e bloqueios de vias',
      'crowdedtransport': 'Transportes públicos lotados',
      'busdelays': 'Atrasos em linhas de ônibus/metrô',
      'bikelaneobtruction': 'Ciclovias obstruídas',
      'sidewalkblocks': 'Calçadas bloqueadas',
      'illegalparking': 'Estacionamento irregular',
      'flooding': 'Pontos de alagamento',
      'poorlighting': 'Áreas com iluminação precária',
      'robberyspots': 'Pontos de assaltos frequentes',
      'brokencameras': 'Câmeras de segurança quebradas',
      'druguse': 'Locais com consumo de drogas',
      'vandalism': 'Vandalismos',
      'landslideareas': 'Áreas de risco de deslizamento',
      'violence': 'Locais com violência frequente',
      'vehicletheft': 'Roubos de veículos',
      'pedestriantheft': 'Furtos a pedestres',
      'harassment': 'Assédio nas ruas',
      'robbery': 'Assalto',
      'illegaldumping': 'Descarte irregular de lixo',
      'noisepollution': 'Poluição sonora',
      'airpollution': 'Poluição do ar',
      'fires': 'Queimadas',
      'fallingtrees': 'Árvores em risco de queda',
      'deforestation': 'Áreas de desmatamento',
      'waterpollution': 'Poluição de rios e córregos',
      'badodor': 'Mau cheiro',
      'abandonedanimals': 'Animais abandonados',
      'urbanpests': 'Pragas urbanas',
      'other': 'Outro'
    };
    
    return labels[subtypeId] || subtypeId;
  };

  return (
    <div className="bg-white text-gray-900 rounded-xl p-4 w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100">
          <TabsTrigger value="details" className="data-[state=active]:bg-white">Detalhes</TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-white">Localização</TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-white">Mídia</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={handleSubmit}>
        <TabsContent value="details" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900" htmlFor="title">
              O que está acontecendo?*
            </label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Buraco na calçada, Falta de iluminação"
              className="border-gray-300 bg-white text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900" htmlFor="description">
              Descreva mais detalhes*
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="inline ml-1 h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Descreva com suas palavras. A gravidade do problema será determinada automaticamente pelo sistema.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Conte mais detalhes sobre o problema, inclua informações sobre urgência e impacto"
              className="border-gray-300 bg-white text-gray-900 min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center text-gray-900">
              Categoria do problema*
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="inline ml-1 h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Selecione a categoria que melhor descreve o problema</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            
            <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
              {PROBLEM_CATEGORIES.map((category) => {
                const CategoryIcon = getCategoryIcon(category);
                const isSelected = type === category;
                
                return (
                  <TooltipProvider key={category}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex flex-col items-center justify-center p-2 border rounded-md cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                          }`}
                          onClick={() => setType(category)}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <CategoryIcon size={24} className={isSelected ? 'text-blue-500' : 'text-gray-500'} />
                          <span className="text-xs mt-1 text-center">{getCategoryLabel(category)}</span>
                          {isSelected && <Check size={16} className="text-blue-500 mt-1" />}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="max-w-xs">
                          <p className="font-medium">{getCategoryLabel(category)}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
            
            {type && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Tipo específico de problema
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="inline ml-1 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Selecione um tipo específico dentro da categoria escolhida</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                
                <Select
                  value={subtype}
                  onValueChange={setSubtype}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo específico" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Usando a função que aceita string diretamente */}
                    {getSubtypesByCategoryString(type).map((subItem) => (
                      <SelectItem key={subItem} value={subItem}>
                        {getSubtypeLabel(subItem)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {hoveredCategory && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                <p className="font-medium text-gray-700">
                  {getCategoryLabel(hoveredCategory)}
                </p>
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-gray-700">
              <Info size={14} />
              <span>A severidade será determinada automaticamente pelo sistema</span>
            </Badge>
          </div>
        </TabsContent>
        
        {/* Resto do componente permanece igual */}
        <TabsContent value="location" className="space-y-4">
          {/* Conteúdo da aba de localização */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900" htmlFor="location">
              Onde ocorreu o problema?*
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="inline ml-1 h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Você pode digitar um endereço ou usar o mapa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Input 
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Endereço ou coordenadas"
                  className="border-gray-300 pl-10 bg-white text-gray-900"
                  required
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border-gray-300"
                onClick={() => setShowLocationMap(true)}
              >
                <MapPin size={16} />
                Selecionar no mapa
              </Button>
              
              {showLocationMap && renderLocationMap()}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          {/* Conteúdo da aba de mídia */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Adicionar foto (opcional)
            </label>
            <div className="mt-1">
              {image ? (
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1.5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-40 cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Adicionar foto
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      JPG, PNG, GIF até 10MB
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Adicionar vídeo (opcional)
            </label>
            <div className="mt-1">
              {video ? (
                <div className="relative">
                  <video 
                    src={video} 
                    controls
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setVideo(null)}
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1.5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-40 cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                  <div className="text-center">
                    <Video className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Adicionar vídeo
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      MP4, MOV até 50MB
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoChange} 
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </TabsContent>
        
        <div className="mt-4 flex justify-between">
          {activeTab === 'details' ? (
            <Button
              type="button"
              variant="outline"
              className="bg-white text-gray-800 border-gray-300"
              onClick={onCancel || onClose}
            >
              Cancelar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="bg-white text-gray-800 border-gray-300"
              onClick={() => setActiveTab(activeTab === 'location' ? 'details' : 'location')}
            >
              Voltar
            </Button>
          )}
          
          {activeTab === 'media' ? (
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Relatório'}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setActiveTab(activeTab === 'details' ? 'location' : 'media')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continuar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FixedReportProblemForm;