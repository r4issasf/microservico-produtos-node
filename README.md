 🛒 Microsserviço de Catálogo de Produtos (Node.js puro)

Este projeto é um microsserviço em Node.js que consolida produtos de duas fontes diferentes: 1. API externa: https://fakestoreapi.com/products 2. Arquivo local: /src/local-products.json

O serviço expõe o endpoint GET /produtos e retorna um catálogo unificado, padronizado e ordenado por id. Se a API externa falhar, usa o arquivo local; se o arquivo local falhar, usa a API. Se tudo falhar, retorna uma mensagem de erro.

## 💻 Como instalar

1. Clone o repositório: git clone https://github.com/seu-usuario/microservico-produtos-node.git  
2. Entre na pasta do projeto: cd microservico-produtos-node  
3. Instale dependências (opcional): npm install  
Obs.: O projeto usa apenas Node.js nativo, então não há dependências obrigatórias.

## ▶️ Como rodar

npm start

Servidor estará disponível em: http://localhost:3000/produtos

## 🧪 Testando todos os cenários de fallback

```bash
# 1️⃣ API funcionando + local funcionando
# - URL da API correta:
const API_URL = 'https://fakestoreapi.com/products'
# - Arquivo local existe
# - Reinicie o servidor:
npm start
# - Acesse:
http://localhost:3000/produtos
# Resultado esperado: produtos da API + produtos locais, ordenados por id

# 2️⃣ API falhando + local funcionando (fallback da API)
# - Modifique a URL da API para inválida:
const API_URL = 'https://fakestoreapi.com/productsXXX'
# - Arquivo local ainda existe
npm start
http://localhost:3000/produtos
# Resultado esperado: apenas produtos locais (source: "Local")

# 3️⃣ API funcionando + local ausente ou inválido (fallback do local)
# - URL da API correta:
const API_URL = 'https://fakestoreapi.com/products'
# - Renomeie ou corrompa o arquivo local-products.json
npm start
http://localhost:3000/produtos
# Resultado esperado: apenas produtos da API (source: "API")

# 4️⃣ API falhando + local ausente ou inválido (nenhuma fonte disponível)
# - URL da API inválida:
const API_URL = 'https://fakestoreapi.com/productsXXX'
# - Arquivo local ausente ou inválido
npm start
http://localhost:3000/produtos
# Resultado esperado: 
# { "error": "Não foi possível obter produtos de nenhuma fonte." }

## 📬 Exemplos de requisição

GET /produtos  
curl http://localhost:3000/produtos

*Resposta esperada:*  
[
  {
    "id": 1,
    "name": "Camisa Casual",
    "price": 29.9,
    "source": "API"
  },
  {
    "id": 30,
    "name": "Blusa de Time Ajax",
    "price": 150,00,
    "source": "Local"
  }
]

Se nenhuma fonte estiver disponível:  
{
  "error": "Não foi possível obter produtos de nenhuma fonte."
}

## 🏗️ Observações de arquitetura

- Microsserviço implementado com Node.js puro, usando HTTP nativo, sem frameworks.  
- /src contém todo o código e o arquivo JSON local.  
- Endpoint único consolidando dados de múltiplas fontes.  
- Fallback inteligente em caso de falha da API ou do arquivo local.  
- Código modular e pronto para expansão futura.  
- Uso de async/await e fetch nativo para chamadas externas.

## 💡 Decisões relevantes

- Node.js puro para demonstrar entendimento do core do Node.  
- Estrutura /src separa código-fonte e dados locais.  
- Fallback por prioridade: API externa → arquivo local.  
- Padronização de dados: {id, name, price, source}.  
- Ordenação por id para facilitar leitura e consumo do catálogo.  
- Script start via package.json para rodar facilmente o projeto.

## ✨ Autor

Raíssa Ferreira
