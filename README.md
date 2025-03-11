# 🌍 Social Impact Express

Uma plataforma moderna para mapeamento e reporte de problemas urbanos, visando facilitar a comunicação entre cidadãos e autoridades para a melhoria das cidades.

![Social Impact Express Screenshot](https://via.placeholder.com/800x400?text=Social+Impact+Express)

## 📋 Visão Geral

Social Impact Express é uma aplicação web que permite aos cidadãos mapear e reportar problemas urbanos em suas comunidades. Utilizando tecnologias modernas como React, TypeScript e Mapbox, a plataforma oferece uma interface intuitiva para:

- Visualizar problemas reportados em um mapa interativo
- Reportar novos problemas com categorização detalhada
- Acompanhar o status de problemas reportados
- Interagir com outros cidadãos através de comentários
- Análise de dados para identificar áreas problemáticas

## 🚀 Funcionalidades

- **Mapa Interativo**: Visualização geográfica de problemas urbanos
- **Sistema de Reporte**: Formulário detalhado para reportar problemas
- **Categorização**: Classificação de problemas por tipo, severidade e localização
- **Autenticação**: Sistema de login para usuários
- **Comentários**: Possibilidade de discussão sobre os problemas
- **Heatmap**: Visualização de concentração de problemas
- **Filtros**: Filtragem por tipo de problema, severidade e status
- **Compartilhamento**: Opções para compartilhar problemas nas redes sociais

## 🔧 Tecnologias Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS
- **Mapas**: Mapbox GL JS
- **UI Components**: shadcn/ui
- **Notificações**: Toast notifications via Sonner
- **Ícones**: Lucide React

## 🏗️ Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
│   ├── map/         # Componentes relacionados ao mapa
│   ├── ui/          # Componentes de interface
├── pages/           # Páginas da aplicação
├── types/           # Definições de tipos TypeScript
├── config/          # Configurações (Mapbox, etc)
└── assets/          # Recursos estáticos
```

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/PhilipStark/social-impact-express-app.git
   cd social-impact-express-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave de API do Mapbox:
     ```
     VITE_MAPBOX_ACCESS_TOKEN=seu_token_aqui
     ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação em `http://localhost:5173`

## 📝 Recursos e Documentação

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 📱 Funcionalidades Futuras

- [ ] Aplicativo móvel para iOS e Android
- [ ] Integração com APIs governamentais
- [ ] Sistema de votação para priorização de problemas
- [ ] Análises estatísticas avançadas
- [ ] Gamificação para incentivar participação
- [ ] Notificações em tempo real
- [ ] Suporte a múltiplos idiomas

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para questões, sugestões ou colaboração, entre em contato através de [issues](https://github.com/PhilipStark/social-impact-express-app/issues) no GitHub.

---

Desenvolvido com ❤️ para tornar nossas cidades melhores.