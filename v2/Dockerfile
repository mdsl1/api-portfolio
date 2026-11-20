# ==========================================
# Estágio 1: Build da aplicação
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Instala as dependências (com npm ci para builds consistentes e rápidos)
COPY package*.json ./
RUN npm ci

# Copia arquivos de configuração e código-fonte
COPY tsconfig*.json nest-cli.json ./
COPY src/ ./src/

# Compila o projeto TypeScript para JavaScript em dist/
RUN npm run build

# Remove as devDependencies, deixando apenas pacotes de produção
RUN npm prune --omit=dev

# ==========================================
# Estágio 2: Imagem de Produção (leve e segura)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Boas práticas de segurança: executar como usuário não-root (node já embutido no Alpine)
USER node

# Copia arquivos essenciais e dependências de produção já tratadas
COPY --chown=node:node package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

# Porta padrão definida no main.ts (process.env.PORT ?? 3000)
EXPOSE 3000

# Execução direta com Node para receber sinais SIGTERM/SIGINT corretamente
CMD ["node", "dist/main.js"]
