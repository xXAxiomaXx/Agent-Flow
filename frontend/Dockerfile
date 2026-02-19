# Usando Node 22 (LTS mais recente em 2026)
FROM node:22-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (usando 'npm ci' para builds mais consistentes)
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Next.js
EXPOSE 3000

# Comando para rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]