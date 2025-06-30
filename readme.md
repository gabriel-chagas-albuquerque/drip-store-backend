# Drip Store Backend

API RESTful para e-commerce desenvolvida em Node.js, utilizando arquitetura MVC para gerenciar produtos, categorias, usuários e autenticação de uma loja online.

## 🚀 Sobre o Projeto

O Drip Store Backend é uma API completa para e-commerce que oferece funcionalidades modernas como sistema de autenticação JWT, gerenciamento avançado de produtos com imagens e opções personalizáveis, sistema de categorias e busca inteligente com filtros.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js 5.1.0** - Framework web minimalista
- **MySQL** - Banco de dados relacional
- **Sequelize 6.37.7** - ORM para Node.js
- **JWT (jsonwebtoken 9.0.2)** - Autenticação e autorização
- **Bcrypt 6.0.0** - Criptografia de senhas
- **CORS 2.8.5** - Controle de origem cruzada
- **Dotenv 16.5.0** - Gerenciamento de variáveis de ambiente
- **Nodemon 3.1.10** - Desenvolvimento com hot reload

## 📋 Funcionalidades

### 🔐 Sistema de Autenticação
- ✅ Cadastro de usuários com criptografia bcrypt
- ✅ Login com geração de token JWT
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Tokens com expiração de 24 horas

### 👤 Gerenciamento de Usuários
- ✅ Cadastro com validação de campos obrigatórios
- ✅ Consulta de usuário por ID (sem exposição da senha)
- ✅ Atualização de dados do usuário
- ✅ Exclusão de usuário

### 🏷️ Sistema de Categorias
- ✅ CRUD completo de categorias
- ✅ Busca com paginação e filtros
- ✅ Campo `use_in_menu` para controle de exibição
- ✅ Sistema de slug para URLs amigáveis

### 🛍️ Gerenciamento Avançado de Produtos
- ✅ CRUD completo de produtos
- ✅ Sistema de imagens múltiplas por produto
- ✅ Opções personalizáveis (cores, tamanhos, etc.)
- ✅ Relacionamento many-to-many com categorias
- ✅ Controle de estoque e preços
- ✅ Busca inteligente com múltiplos filtros:
  - Busca por nome/descrição
  - Filtro por categorias
  - Filtro por faixa de preço
  - Filtro por opções do produto
- ✅ Paginação avançada
- ✅ Seleção de campos específicos

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/gabriel-chagas-albuquerque/drip-store-backend.git
cd drip-store-backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações específicas baseado no template `.env.example` fornecido no repositório.

4. **Configure o banco de dados:**
- Crie um banco MySQL chamado `drip_store`
- Execute as migrações do Sequelize (ou crie as tabelas manualmente)

5. **Inicie o servidor:**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/v1
```

### 🔐 Autenticação

#### Registrar Usuário
```http
POST /user
Content-Type: application/json

{
  "firstname": "João",
  "surname": "Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### Login (Gerar Token)
```http
POST /user/token
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

### 👤 Usuários

#### Buscar Usuário por ID
```http
GET /user/:id
```

#### Atualizar Usuário
```http
PUT /user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstname": "João Carlos"
}
```

#### Deletar Usuário
```http
DELETE /user/:id
Authorization: Bearer {token}
```

### 🏷️ Categorias

#### Listar Categorias
```http
GET /category/search?limit=12&page=1&use_in_menu=true
```

Parâmetros de query:
- `limit`: Limite de resultados (padrão: 12, use -1 para todos)
- `page`: Página atual (padrão: 1)
- `fields`: Campos específicos (ex: `name,slug`)
- `use_in_menu`: Filtra por categorias do menu (`true`/`false`)

#### Buscar Categoria por ID
```http
GET /category/:id
```

#### Criar Categoria
```http
POST /category
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Tênis",
  "slug": "tenis",
  "use_in_menu": true
}
```

#### Atualizar Categoria
```http
PUT /category/:id
Authorization: Bearer {token}
```

#### Deletar Categoria
```http
DELETE /category/:id
Authorization: Bearer {token}
```

### 🛍️ Produtos

#### Buscar Produtos (com filtros avançados)
```http
GET /product/search
```

Parâmetros disponíveis:
- `limit`: Limite de resultados (padrão: 12)
- `page`: Página atual (padrão: 1)
- `fields`: Campos específicos
- `match`: Busca por nome/descrição
- `category_ids`: IDs das categorias (ex: `1,2,3`)
- `price-range`: Faixa de preço (ex: `100-500`)
- `option[1]`: Filtro por opções (ex: `Azul,Vermelho`)

Exemplo completo:
```http
GET /product/search?limit=10&page=1&match=nike&category_ids=1,2&price-range=100-300
```

#### Buscar Produto por ID
```http
GET /product/:id
```

#### Criar Produto
```http
POST /product
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Tênis Nike Air Max",
  "slug": "tenis-nike-air-max",
  "description": "Tênis esportivo confortável",
  "price": 299.99,
  "price_with_discount": 249.99,
  "stock": 50,
  "enabled": true,
  "use_in_menu": false
}
```

#### Atualizar Produto
```http
PUT /product/:id
Authorization: Bearer {token}
```

#### Deletar Produto
```http
DELETE /product/:id
Authorization: Bearer {token}
```

## 🗂️ Estrutura do Banco de Dados

### Tabelas Principais

#### Users
- `id` (PK, Auto Increment)
- `firstname` (String, Required)
- `surname` (String, Required)
- `email` (String, Required)
- `password` (String, Hashed)
- `createdAt`, `updatedAt`

#### Categories
- `id` (PK, Auto Increment)
- `name` (String, Required)
- `slug` (String, Required)
- `use_in_menu` (Boolean, Default: false)
- `createdAt`, `updatedAt`

#### Products
- `id` (PK, Auto Increment)
- `enabled` (Boolean, Default: false)
- `name` (String, Required)
- `slug` (String, Required)
- `use_in_menu` (Boolean, Default: false)
- `stock` (Integer, Default: 0)
- `description` (String)
- `price` (Float, Required)
- `price_with_discount` (Float, Required)
- `createdAt`, `updatedAt`

#### Images_Products
- `id` (PK, Auto Increment)
- `product_id` (FK to Products)
- `enabled` (Boolean, Default: false)
- `path` (String, Required)

#### Options_Products
- `id` (PK, Auto Increment)
- `product_id` (FK to Products)
- `title` (String, Required)
- `shape` (ENUM: 'square', 'circle')
- `radius` (Integer, Default: 0)
- `type` (ENUM: 'text', 'color')
- `values` (String, Required)

#### Products_Categories (Tabela de Relacionamento)
- `product_id` (FK to Products)
- `category_id` (FK to Categories)

## 📁 Arquitetura do Projeto

```
src/
├── controllers/
│   ├── categoryController.js    # Lógica de categorias
│   ├── productController.js     # Lógica de produtos
│   └── userController.js        # Lógica de usuários
├── models/
│   ├── Category.js              # Model de categoria
│   ├── ImageProduct.js          # Model de imagens
│   ├── OptionsProduct.js        # Model de opções
│   ├── Product.js               # Model de produto
│   ├── ProductsCategory.js      # Model de relacionamento
│   └── User.js                  # Model de usuário
├── routes/
│   ├── categoryRoutes.js        # Rotas de categorias
│   ├── productRoutes.js         # Rotas de produtos
│   ├── userRoutes.js            # Rotas de usuários
│   └── routes.js                # Centralizador de rotas
├── middlewares/
│   └── authMiddleware.js        # Middleware de autenticação
├── config/
│   └── database.js              # Configuração do Sequelize
└── server.js                    # Arquivo principal
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev
```

## 🔒 Middleware de Autenticação

O projeto utiliza middleware JWT para proteger rotas sensíveis:

- **Rotas Públicas**: Busca de produtos, categorias, registro e login
- **Rotas Protegidas**: Criação, atualização e exclusão de recursos

Para acessar rotas protegidas, inclua o header:
```http
Authorization: Bearer {seu-token-jwt}
```

## 🚀 Funcionalidades Avançadas

### Sistema de Busca Inteligente
- Busca textual em nome e descrição
- Filtros por múltiplas categorias
- Filtro por faixa de preço
- Filtro por opções específicas dos produtos
- Paginação otimizada
- Seleção de campos específicos para otimização

### Relacionamentos Complexos
- Produtos podem ter múltiplas imagens
- Produtos podem ter múltiplas opções (cor, tamanho, etc.)
- Relacionamento many-to-many entre produtos e categorias
- Eager loading otimizado com aliases

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 📞 Colaboradores

**Gabriel das Chagas Albuquerque**
- GitHub: [@gabriel-chagas-albuquerque](https://github.com/gabriel-chagas-albuquerque)

**Samuel Teles**
- GitHub: [@SamueltelF](https://github.com/SamueltelF)

**Davi Alves**
- GitHub: [@davi-aalves](https://github.com/davi-aalves)

## 📎 Links do Projeto  
- Repositório: [https://github.com/gabriel-chagas-albuquerque/drip-store-backend](https://github.com/gabriel-chagas-albuquerque/drip-store-backend)

- Frontend: [https://github.com/gabriel-chagas-albuquerque/projeto-drip-store](https://github.com/gabriel-chagas-albuquerque/projeto-drip-store)

---

⭐ **Se este projeto contribuiu para seu aprendizado assim como contribuiu para o meu, considere dar uma estrela no repositório!**
