# 💼 Desafio Técnico - Estagiário(a) de Desenvolvimento | Haytek

Bem-vindo ao meu desafio técnico para a vaga de Estágio em Desenvolvimento na **Haytek**!  
Este projeto é um sistema completo de **gestão de produtos** (e-commerce de lentes fotográficas), com operações CRUD, filtros, interface responsiva e API documentada.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- **NestJS** (framework Node.js)
- **TypeScript**
- **TypeORM** com **PostgreSQL**
- **Swagger** (documentação OpenAPI)
- **Jest** (testes unitários)

### 🎨 Frontend

- **React** com **Vite**
- **TypeScript**
- **Material UI (MUI)**
- **Axios**
- **React Hook Form** + **Yup**
- **React Router**

### 🐳 Infraestrutura

- **Docker** e **Docker Compose**
- **PostgreSQL** containerizado
- **pgAdmin** para gerenciamento do banco

---

## ⚙️ Como executar o projeto

### 🐳 Opção 1: Com Docker (Recomendado)

1. **Clone o repositório**

```bash
git clone https://github.com/pedrodev2005/haytek-product.git
cd haytek-product
```

2. **Execute com Docker Compose**

```bash
docker-compose up -d
```

3. **Aguarde alguns minutos** para que todos os serviços inicializem

4. **Acesse os serviços**

   - 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
   - 🔗 **API Backend**: [http://localhost:3000/products](http://localhost:3000/products)
   - 📚 **Documentação Swagger**: [http://localhost:3000/api](http://localhost:3000/api)
   - 🗄️ **pgAdmin**: [http://localhost:5050](http://localhost:5050)

5. **Configurar pgAdmin (opcional)**
   - Acesse: [http://localhost:5050](http://localhost:5050)
   - **Login**: `admin@admin.com` / **Senha**: `admin123`
   - **Adicionar servidor PostgreSQL**:
     - Clique com botão direito em "Servers" → "Register" → "Server..."
     - **Aba General**: Name = `haytekdb`
     - **Aba Connection**:
       - Host = `postgres`
       - Port = `5432`
       - Database = `haytekdb`
       - Username = `postgres`
       - Password = `3394`

---

### 💻 Opção 2: Desenvolvimento Local

1. **Clone o repositório**

```bash
git clone https://github.com/pedrodev2005/haytek-product.git
cd haytek-product
```

2. **Configure o banco de dados PostgreSQL**
   - Crie um banco local (ex: `haytek_db`)
   - Crie o arquivo `.env` dentro da pasta `backend/`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=haytek_db
```

3. **Backend**

```bash
cd backend
npm install
npm run start:dev
```

4. **Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔎 Exemplo de chamadas à API

### Criar produto

```http
POST /products
Content-Type: application/json

{
  "model": "Canon EF 50mm f/1.8 STM",
  "brand": "Canon",
  "type": "Prime",
  "focalLength": "50mm",
  "maxAperture": "f/1.8",
  "mount": "Canon EF Mount",
  "weight": 160,
  "hasStabilization": false
}
```

### Buscar produtos com filtros

```http
GET /products?page=1&limit=5&search=Canon&type=Prime
```

### Atualizar produto

```http
PUT /products/:id
Content-Type: application/json

{
  "model": "Canon EF 85mm f/1.4L IS USM",
  "weight": 950
}
```

### Deletar produto (soft delete)

```http
DELETE /products/:id
```

---

## ✅ Funcionalidades Implementadas

- [x] **CRUD completo** de produtos (Create, Read, Update, Delete)
- [x] **Soft Delete** - exclusão lógica sem perder dados
- [x] **Paginação** e **filtros** por tipo, marca e modelo
- [x] **Validação robusta** com Yup no frontend e DTOs no backend
- [x] **Feedback visual** com Snackbar e loading states
- [x] **Interface responsiva** e acessível (Material UI)
- [x] **API RESTful** com validações e tratamento de erros
- [x] **Documentação automática** com Swagger (OpenAPI)
- [x] **Testes unitários** com Jest
- [x] **Dockerização completa** com orquestração de serviços

---

## 🗑️ Exclusão com Soft Delete

A exclusão de produtos **não remove fisicamente do banco de dados**.  
O sistema utiliza **soft delete**, marcando o campo `active` como `false`.

**Benefícios:**

- ✅ Produto deixa de aparecer na API e interface
- ✅ Dados permanecem salvos para auditoria
- ✅ Possibilidade de restauração futura
- ✅ Prática padrão em sistemas empresariais
- ✅ Evita perda acidental de dados importantes

---

## ✨ Diferenciais Técnicos

| Requisito                   | Status | Detalhes                            |
| --------------------------- | ------ | ----------------------------------- |
| **Testes unitários**        | ✅     | Jest com cobertura 75%+             |
| **Documentação OpenAPI**    | ✅     | Swagger interativo                  |
| **Dockerização completa**   | ✅     | Multi-container com orquestração    |
| **UI/UX profissional**      | ✅     | Material UI + responsividade        |
| **Código limpo e tipado**   | ✅     | TypeScript em frontend e backend    |
| **Banco de dados robusto**  | ✅     | PostgreSQL + pgAdmin                |
| **Validações consistentes** | ✅     | DTOs no backend + Yup no frontend   |
| **Tratamento de erros**     | ✅     | Feedback visual e logs estruturados |

---

## 📂 Estrutura do Projeto

```
📦 seu-projeto/
 ┣ 📁 backend/      ← API NestJS
 ┣ 📁 frontend/     ← Interface React
 ┣ 📄 README.md
 ┣ 📄 docker-compose.yml
```

---

## 🧪 Testes

### Executar testes unitários

```bash
# Com Docker (recomendado)
docker-compose exec backend npm run test

# Cobertura de testes
docker-compose exec backend npm run test:cov

# Modo watch para desenvolvimento
docker-compose exec backend npm run test:watch

# Localmente
cd backend
npm run test
```

### Exemplo de resultado

```text
PASS  src/products/products.service.spec.ts
PASS  src/products/products.controller.spec.ts
PASS  src/app.controller.spec.ts

Test Suites: 3 passed, 3 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        2.156 s
Coverage:    78.45%
```

---

## 🐳 Comandos Docker Úteis

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Parar todos os serviços
docker-compose down

# Rebuild completo
docker-compose up --build -d

# Acessar terminal do backend
docker-compose exec backend bash

# Acessar PostgreSQL via CLI
docker-compose exec postgres psql -U postgres -d haytekdb

# Ver status dos containers
docker-compose ps

# Remover volumes (cuidado: apaga dados!)
docker-compose down -v
```

---

## 🔧 Configuração do Ambiente

### 🚪 Portas utilizadas

- **Frontend React**: `5173`
- **Backend NestJS**: `3000`
- **PostgreSQL**: `5432`
- **pgAdmin**: `5050`

### 💾 Volumes Docker

- `pgdata`: Dados persistentes do PostgreSQL
- `pgadmin_data`: Configurações do pgAdmin

### 🌐 URLs dos serviços

- **Aplicação**: http://localhost:5173
- **API**: http://localhost:3000/products
- **Swagger**: http://localhost:3000/api
- **pgAdmin**: http://localhost:5050

---

## 📋 Pré-requisitos

### Para execução com Docker

- **Docker** 20.10+
- **Docker Compose** 2.0+

### Para desenvolvimento local

- **Node.js** 18+
- **npm** ou **yarn**
- **PostgreSQL** 13+

---

## 🔍 Monitoramento e Debug

### Verificar saúde dos serviços

```bash
# Status dos containers
docker-compose ps

# Consumo de recursos
docker stats

# Logs detalhados
docker-compose logs --tail=100 -f
```

### Endpoints de saúde

- **Backend**: `GET /products` (retorna lista)
- **Frontend**: Carregamento da interface
- **Database**: Conexão via pgAdmin

---

## 🚨 Solução de Problemas

### Porta já está em uso

```bash
# Verificar processos usando as portas
lsof -i :3000
lsof -i :5173
lsof -i :5432

# Parar containers e tentar novamente
docker-compose down
docker-compose up -d
```

### Banco de dados não conecta

```bash
# Verificar logs do PostgreSQL
docker-compose logs postgres

# Reiniciar apenas o banco
docker-compose restart postgres
```

### Frontend não carrega

```bash
# Rebuild do frontend
docker-compose up --build frontend

# Verificar logs
docker-compose logs frontend
```

---

## 📞 Contato

**Pedro Moraes**  
🎓 Estudante de Análise e Desenvolvimento de Sistemas  
📧 **Email**: pedro.dev2005@gmail.com  
🔗 **GitHub**: [pedrodev2005](https://github.com/pedrodev2005)  
💼 **LinkedIn**: [Seu LinkedIn]

---

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo da **Haytek** e está disponível para fins educacionais e de avaliação técnica.

---

_Desenvolvido com ❤️ e muita dedicação para a **Haytek** 🚀_
