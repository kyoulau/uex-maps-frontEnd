# 🗺️ Frontend: Gerenciador de Contatos

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)
![Material UI](https://img.shields.io/badge/Material_UI-5-blue?style=for-the-badge&logo=mui)
![Google Maps](https://img.shields.io/badge/Google_Maps-API-green?style=for-the-badge&logo=googlemaps)

Este é o projeto de frontend para o Desafio Técnico UEX. É um Single Page Application (SPA) construído com React, TypeScript e Vite, que consome a API de backend (`localhost:8081`).

## ⚙️ Stack de Tecnologias

* **React 18:** Biblioteca principal para a construção da UI.
* **TypeScript:** Superset do JavaScript para tipagem estática.
* **Vite:** Ferramenta de build e servidor de desenvolvimento.
* **React Router DOM:** Para gerenciamento de rotas (Login, Registro, Home).
* **Material UI (MUI):** Biblioteca de componentes para o design system (obrigatório pelo escopo).
* **Axios:** Cliente HTTP para fazer requisições à API (com interceptor para JWT).
* **@react-google-maps/api:** Biblioteca para integração do Google Maps.

---

## 🚀 Executando o Projeto (Desenvolvimento)

Este guia assume que a **API de Backend já está em execução** (via `docker-compose up` ou pela IDE) e disponível em `http://localhost:8081`.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS 18+ recomendada)
* A API de Backend deve estar rodando em `http://localhost:8081`.

### 2. Instalação

Na raiz deste diretório (`/frontend`), instale as dependências:

```bash
npm install
# React + TypeScript + Vite
```

### 3. Variáveis de Ambiente (Obrigatório)

Este projeto requer uma chave de API do Google para o Maps JavaScript API. Esta chave é PÚBLICA e DIFERENTE da chave secreta usada no backend.

Crie um arquivo chamado .env na raiz do diretório frontend.

  Adicione a sua chave de API do Google Maps (com a "Maps JavaScript API" ativada e restrição HTTP para http://localhost:5173/*).
  
  ```bash
/frontend/.env
(Note o prefixo VITE_, que é obrigatório)
VITE_GOOGLE_MAPS_KEY=SUA_CHAVE_DE_API_DO_FRONTEND_AQUI
```

### 4. Rodando a Aplicação

Após instalar e configurar o .env, inicie o servidor de desenvolvimento do Vite:
Bash

npm run dev

A aplicação estará disponível em: 📍 URL: http://localhost:5173

### 🧩 Funcionalidades Implementadas

  Autenticação: Telas de Login (/login) e Registro (/register) que se comunicam com o backend e salvam o JWT no localStorage.

  Rota Protegida: A rota principal (/) é protegida. Usuários não logados são redirecionados para /login.

  Layout Principal: A tela principal é dividida em uma lista de contatos (esquerda) e um mapa (direita).

  CRUD de Contatos:

  Adicionar: Botão "Adicionar Contato" abre um modal.

  Editar/Deletar: Botões em cada item da lista para editar ou deletar.

  Listar: A lista é carregada e atualizada automaticamente após cada ação.

  Filtro de Contatos: Um campo de texto filtra a lista de contatos por nome (chamando GET /contacts?nome=...).

Mapa Interativo:

Pins: Todos os contatos são plotados no mapa usando suas coordenadas.

Centralização: Clicar em um contato na lista centraliza o mapa no pin daquele contato.

Ajuda ViaCep (Proxy): O modal de criação/edição usa o proxy do backend (GET /address/search) para buscar e autopreencher dados de endereço (CEP, Bairro).

    Feedback ao Usuário: Indicadores de loading e mensagens de erro em todos os formulários.

    Gerenciamento de Usuário:

        Logout: Botão para limpar o token e sair.

        Excluir Conta: Botão (com modal de confirmação de senha) para deletar a conta do usuário (DELETE /user/me).
