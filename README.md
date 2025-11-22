# Bridgely - Frontend (Client)

Esta é a interface de usuário do projeto Bridgely, construída com React e Vite, utilizando Tailwind CSS v4 para estilização moderna e responsiva.

## 👥 Integrantes do Grupo
* **João Pedro Raimundo Marcilio** | RM 561603
* **Lucas Clemente Zanella** | RM 563880
* **Ben-Hur Iung de Lima Ferreira** | RM 561564

## 🛠️ Tecnologias Utilizadas
* React.js
* Vite
* Tailwind CSS v4
* Axios (para requisições HTTP)
* React Router DOM (para navegação)
* React-Icons (para ícones)
* Framer Motion (para animações)

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar a interface:

### 1. Instalar Dependências
Abra o terminal na pasta deste frontend e execute:

```
npm install
```
### 2. Configuração da API
Certifique-se de que o arquivo de configuração da API (geralmente em src/config/apiConfig.js) esteja apontando para a porta correta do seu backend.

Exemplo:

```
export const API_URL = "http://localhost:5002"
```
### 3. Executar o Projeto
Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```
Após o comando, o terminal mostrará o link de acesso local (geralmente ```http://localhost:5173```).

### Observação
Para que todas as funcionalidades (Login, Feed, IA) funcionem, o Backend **deve estar rodando simultaneamente em outra aba do terminal**.
