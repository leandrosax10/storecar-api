# storecar-api
![App](https://github.com/leandrosax10/storecar-api/blob/master/src/img/logotipoStoreCar.png)

 Este projeto é uma API Rest em NodeJs e Typescript desenvolvida para fins de aprendizado e portfólio.
 
 ## Tecnologias utilizadas
 
* [Visual Studio Code - IDE](#VS_CODE)
* [Insomnia](#insomnia)
* [Node](#Node)
* [Typescript](#Typescript)
* [Express](#express)
* [Cors](#cors)
* [Mongo DB](#MongoDB)

## Bibliotecas utilizadas

* [Yup](#yup)
* [Json Web Token](#jsonwebtoken)
 
 ## Inicialização:
 
 Para executar o projeto é necessário ter instalado o [Node.js(versão 18)](https://nodejs.org/en/download).
 
 Clone o repositório:
 
`$ git clone https://github.com/leandrosax10/storecar-api.git`
 
 Entre na pasta
 
 `$ cd storecar-api`
 
 Instale as dependências
 
 `$ npm install`
 
 Configure as variáveis de ambiente, crie o arquivo `.env` na pasta raiz do projeto e coloque o conteúdo a seguir dentro:
 
 `DATABASE_URL=mongodb://127.0.0.1:27017/carStoreDb`
 
 `PORT= 3000`
 
 `JWT_SECRET_KEY=[Uma string qualquer]`
 
 Rode o projeto
 
 `$ npm run start-dev`
 
  Para ter acesso a documentação da api:
  
  `Após rodar o projeto, digite esse caminho em seu navegador http://localhost:3000/`
  
