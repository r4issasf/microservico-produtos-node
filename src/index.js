const http = require('http');
const fs = require('fs/promises');

const porta = 3000;

const API_URL = 'https://fakestoreapi.com/products';

async function chamarApi() {
    try {
   const resp = await fetch(API_URL);
   if (resp.status >= 200 && resp.status < 300) {
    const obj = await resp.json();
    
    const prodpadronizado = PadronizarApi(obj);
    return prodpadronizado;
   }
        
    console.log(`Não foi possível acessar a API, entrando em contato com os produtos locais!!:`);
    return null;
   
    } catch (error) {
    console.log('Erro ao chamar a API:', error);
    return null;
   }
}

   function  PadronizarApi(obj) {
    return obj.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        source: 'API'
        }));
      }
    
   
async function lerArquivoJson() {  
    try {
    const text = await fs.readFile('./src/local-products.json', 'utf-8');
    const Dados = JSON.parse(text);

    const ProdPadronizado = Dados.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        source: 'Local'
        }));

    return ProdPadronizado;
    } catch (error) {
    console.log('Erro ao ler o arquivo local !!', error);
    return null;

    }
}

async function ObterProdutos()  { 
let produtosApi = null;
let produtosLocal = null;

try {
    produtosApi = await chamarApi();
} catch (e) {
    produtosApi = null;
}

try {
    produtosLocal = await lerArquivoJson();
} catch (e) {
    produtosLocal = null;
}

if (!produtosApi && !produtosLocal) {
    return {error: 'Não foi possível obter produtos de nenhuma fonte.'};
}

if (produtosApi && produtosLocal) {
    const JuntOrd = [...produtosApi, ...produtosLocal];
    JuntOrd.sort((a, b) => a.id - b.id);
    return JuntOrd;
}

if (produtosApi && !produtosLocal) { 
    produtosApi.sort((a, b) => a.id - b.id);
    return produtosApi;
}

if (!produtosApi && produtosLocal) {
    produtosLocal.sort((a, b) => a.id - b.id);
    return produtosLocal;
   }
}

const server = http.createServer(async(req, res) => {

    if (req.url === '/produtos' && req.method === 'GET') {
        const resultado = await ObterProdutos();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(resultado, null, 2));
        return;
    }

    res.writeHead(400, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({error: 'Rota não encontrada' }));
});

server.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}/`);
});
