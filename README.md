# 🌊 NepTune Labs — SoulUp

Projeto desenvolvido pela equipe **NepTune Labs** para a Sprint 03.

O **SoulUp** é uma aplicação web voltada para mobilidade sustentável, tecnologia e conscientização ambiental. A plataforma apresenta recursos para acompanhamento de impacto ambiental, sistema de pontos, informações sobre a solução e interação com os usuários.

---

## 🚀 Sobre o projeto

Na Sprint 03, o projeto foi reconstruído utilizando **React + TypeScript + Vite**, transformando a aplicação anterior em uma **Single Page Application (SPA)**.

A nova estrutura foi organizada em componentes reutilizáveis, páginas, hooks, rotas e utilitários, facilitando a manutenção e evolução do projeto.

Entre as principais melhorias estão:

- Componentização com React
- Navegação SPA com React Router
- TypeScript
- TailwindCSS
- Rotas estáticas e dinâmicas
- Hooks do React
- Hooks personalizados
- Formulários com validação
- Página 404
- Tratamento de erros
- Responsividade
- Busca e filtros
- Calculadora de impacto ambiental
- Carteira de pontos

---

## 🛠️ Tecnologias utilizadas

- **React**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **React Hook Form**
- **TailwindCSS**
- **PostCSS**
- **Oxlint**
- **Git**
- **GitHub**

---

## 📁 Estrutura do projeto

```text
src/
├── components/
│   ├── layout/
│   └── ui/
│
├── data/
│
├── hooks/
│
├── pages/
│   ├── Contato/
│   ├── FAQ/
│   ├── Home/
│   ├── Integrantes/
│   ├── NotFound/
│   ├── Sobre/
│   └── Solucao/
│
├── routes/
│
├── types/
│
├── utils/
│
├── index.css
└── main.tsx
```

---

## 🧭 Rotas da aplicação

### Rotas principais

```text
/
 /sobre
 /solucao
 /integrantes
 /faq
 /contato
```

### Rotas dinâmicas

```text
/integrantes/:rm
/solucao/:slug
```

As rotas dinâmicas permitem carregar informações específicas de integrantes e módulos da solução utilizando parâmetros da URL.

---

## 🌱 Funcionalidades

### Calculadora de impacto ambiental

Permite simular o impacto ambiental de acordo com informações relacionadas ao deslocamento do usuário.

A calculadora considera dados como:

- Distância percorrida
- Quantidade de dias
- Tipo de veículo
- Consumo médio
- Preço do combustível
- Emissão estimada de CO₂

---

### Carteira de pontos

Simulação de uma carteira de pontos que permite:

- Adicionar pontos
- Consultar saldo
- Visualizar histórico
- Simular utilização dos pontos
- Validar saldo insuficiente

---

### Página de integrantes

Permite visualizar os integrantes da equipe NepTune Labs.

Também possui:

- Busca por integrante
- Busca por RM
- Busca por função
- Perfil individual
- GitHub
- LinkedIn
- Rota dinâmica por RM

---

### FAQ

Sistema de perguntas frequentes com:

- Filtro por categoria
- Acordeão de perguntas
- Estado controlado com React

---

### Formulário de contato

Formulário desenvolvido com **React Hook Form**, incluindo validação dos campos e exibição de mensagens de erro.

---

## 👥 Equipe — NepTune Labs

### Patrick Ariel
**RM:** 573589  
**Função:** Product Owner — P.O.

---

### Bruno Pires
**RM:** 571202
**Função:** Desenvolvimento Front-End

---

### Pedro Henrique
**RM:** 573547
**Função:** Desenvolvimento Front-End

---

### Gustavo Correia
**RM:** 568745
**Função:** Desenvolvimento Front-End
---

### Gustavo Gonçalves
**RM:** 572418  
**Função:** Desenvolvimento Front-End

---

## 💻 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/PatrickAriel0/Site_SoulUp_pt2.git
```

### 2. Entre na pasta

```bash
cd Site_SoulUp_pt2
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá um endereço semelhante a:

```text
http://localhost:5173/
```

Abra esse endereço no navegador.

---

## ✅ Verificações do projeto

### Verificar TypeScript

```bash
npx tsc --noEmit
```

### Executar lint

```bash
npm run lint
```

### Gerar build de produção

```bash
npm run build
```

---

## 📱 Responsividade

A aplicação foi desenvolvida para funcionar em diferentes tamanhos de tela, incluindo:

- Smartphones
- Tablets
- Notebooks
- Desktops

O menu também possui comportamento responsivo para dispositivos móveis.

---

## ♿ Acessibilidade

O projeto utiliza práticas como:

- HTML semântico
- Labels nos formulários
- Estados de foco visíveis
- Mensagens de erro
- Navegação estruturada
- Tratamento de páginas inexistentes

---

## 🔗 Repositório

Projeto disponível em:

[github.com/PatrickAriel0/Site_SoulUp_pt2](https://github.com/PatrickAriel0/Site_SoulUp_pt2)

---

## 🏢 Desenvolvido por

**NepTune Labs**

### SoulUp

Tecnologia, sustentabilidade e mobilidade trabalhando juntas para gerar impacto positivo.

---

## 📄 Sprint

**Sprint 03 — Front-End Design Engineering**