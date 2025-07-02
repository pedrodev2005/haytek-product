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

---

## ⚙️ Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configure o banco de dados

- Crie um banco PostgreSQL local (ex: `haytek_db`)
- Crie o arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=haytek_db
```

> Substitua os valores conforme seu ambiente local.

---

### 3. Backend

```bash
cd backend
npm install
npm run start:dev
```

- Acesse a API: [http://localhost:3000/products](http://localhost:3000/products)
- Documentação Swagger: [http://localhost:3000/api](http://localhost:3000/api)

---

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Acesse o frontend: [http://localhost:5173](http://localhost:5173)

---

## 🔎 Exemplo de chamadas à API

### Criar produto

```http
POST /products
```

```json
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

---

## ✅ Funcionalidades Implementadas

- [x] CRUD de produtos (Create, Read, Update, Delete com soft delete)
- [x] Paginação e filtros por tipo/modelo
- [x] Formulários com validação (Yup)
- [x] Feedback visual com Snackbar
- [x] Responsividade e acessibilidade
- [x] API com validações via DTO
- [x] Documentação Swagger (OpenAPI)
- [x] Testes unitários com Jest

---

## 🗑️ Exclusão com Soft Delete

A exclusão de produtos **não remove do banco de dados fisicamente**.  
Em vez disso, o campo `active` é marcado como `false`.

- O produto deixa de aparecer na API e na interface
- Permanece salvo no banco para auditoria ou restauração futura
- Isso evita perda acidental de dados e é uma prática comum em sistemas reais

---

## ✨ Diferenciais

| Requisito             | Status |
| --------------------- | ------ |
| Testes unitários      | ✅     |
| Documentação Swagger  | ✅     |
| Dockerização          | ✅     |
| UI/UX cuidadosa       | ✅     |
| Código limpo e tipado | ✅     |

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

## 🧪 Cobertura de Testes

```bash
npm run test:cov
```

Exemplo de resultado:

```text
PASS  src/products/products.service.spec.ts
PASS  src/products/products.controller.spec.ts
Test Suites: 3 passed
Tests:       14 passed
Coverage:    75%+
```

---

## 🐳 Docker (opcional)

> Em breve: configuração com **Docker Compose** para rodar backend e frontend juntos.

---

## 👤 Autor

**Pedro Moraes**  
Estudante de Análise e Desenvolvimento de Sistemas  
📧 Email: [pedro.dev2005@gmail.com]

---
