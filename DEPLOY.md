# Guia de Deploy - Social Impact Express

Este guia fornece instruções para fazer o deploy da aplicação Social Impact Express em diferentes plataformas.

## Opção 1: Deploy no Vercel (Recomendado)

A Vercel é a plataforma mais simples para deploy de aplicações React. Ela oferece um plano gratuito generoso e se integra facilmente com o GitHub.

### Passos para deploy no Vercel:

1. Crie uma conta em [vercel.com](https://vercel.com) (você pode fazer login com sua conta GitHub)

2. No dashboard da Vercel, clique em "Add New..." e selecione "Project"

3. Importe o repositório GitHub `social-impact-express-app`

4. Na tela de configuração:
   - Framework Preset: selecione "Vite"
   - Build Command: `npm run build` (já preenchido automaticamente)
   - Output Directory: `dist` (já preenchido automaticamente)
   - Clique em "Environment Variables" e adicione:
     - Nome: `VITE_MAPBOX_ACCESS_TOKEN`
     - Valor: `pk.eyJ1IjoicGhpbGJpdHQxMSIsImEiOiJjbTd5cXZpNnAwZGY4MnNweXZ3aGd1MzhhIn0.AE07Q_1w6QObLaYrHd5k3Q`

5. Clique em "Deploy"

6. Após o deploy, a Vercel fornecerá uma URL para sua aplicação (exemplo: `social-impact-express.vercel.app`)

7. (Opcional) Configure um domínio personalizado em Settings → Domains

## Opção 2: Deploy no Netlify

Netlify é outra excelente opção para fazer deploy de aplicações front-end.

### Passos para deploy no Netlify:

1. Crie uma conta em [netlify.com](https://netlify.com)

2. No dashboard do Netlify, clique em "Add new site" → "Import an existing project"

3. Conecte com GitHub e selecione o repositório `social-impact-express-app`

4. Na tela de configuração:
   - Base directory: deixe em branco
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Clique em "Show advanced" e adicione variável de ambiente:
     - Nome: `VITE_MAPBOX_ACCESS_TOKEN`
     - Valor: `pk.eyJ1IjoicGhpbGJpdHQxMSIsImEiOiJjbTd5cXZpNnAwZGY4MnNweXZ3aGd1MzhhIn0.AE07Q_1w6QObLaYrHd5k3Q`

5. Clique em "Deploy site"

6. Após o deploy, o Netlify fornecerá uma URL para sua aplicação (exemplo: `social-impact-express.netlify.app`)

## Opção 3: Deploy com GitHub Pages

GitHub Pages é uma opção gratuita, porém requer algumas configurações adicionais.

### Passos para deploy com GitHub Pages:

1. Primeiro, modifique a configuração do Vite para suportar GitHub Pages. Edite `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/social-impact-express-app/',  // Adicione esta linha
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

2. Adicione um script de deploy ao `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Instale a dependência gh-pages:

```bash
npm install --save-dev gh-pages
```

4. Execute o comando de deploy:

```bash
npm run deploy
```

5. No GitHub, vá para Settings → Pages e configure a source como a branch `gh-pages`

6. Seu site estará disponível em `https://[seu-usuario].github.io/social-impact-express-app/`

## Considerações para Produção

1. **Domínio personalizado**: Para uso em produção, é recomendável configurar um domínio personalizado.

2. **Monitoramento**: Configure ferramentas de monitoramento como Google Analytics ou Sentry.

3. **Escalabilidade**: Vercel e Netlify oferecem planos pagos que fornecem mais recursos para aplicações com alto tráfego.

4. **Backup**: Certifique-se de que todo o código fonte está sempre sincronizado com o GitHub para backup.

## Resolução de Problemas

Se encontrar problemas durante o deploy:

1. Verifique os logs de build na plataforma de deploy
2. Certifique-se de que todas as variáveis de ambiente estão configuradas
3. Confirme que o token do Mapbox está correto
4. Verifique se o arquivo `vercel.json` está na raiz do projeto se estiver usando Vercel
5. Confirme que o arquivo `_redirects` está na pasta `public/` se estiver usando Netlify

Para ajuda adicional, consulte a documentação oficial da plataforma escolhida ou abra uma issue no GitHub.