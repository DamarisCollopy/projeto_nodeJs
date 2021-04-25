# projeto_nodeJs
# Preparando o ambiente
# Sem mais delongas, vamos ao conteúdo principal desse guia: configuração do seu ambiente para o NLW. Teremos três etapas principais na seção "Instalação":
# Node + NPM;
# Yarn;
# Visual Studio Code e configurações.

# Linux (Ubuntu/Debian)
# Para o Linux iremos utilizar o NodeSource, basta seguir esses passos:
# Verifique se você possui o curl instalado rodando no terminal o comando:
curl --version

# Caso ele retorne a versão, pode pular para o próximo passo. Caso não, basta rodar o comando:
sudo apt install curl

# Com o curl instalado, execute o comando de instalação da versão LTS mais recente disponível:


# Ubuntu
curl -sL <https://deb.nodesource.com/setup_lts.x> | sudo -E bash -
sudo apt-get install -y nodejs



# Debian (como root)
curl -sL <https://deb.nodesource.com/setup_lts.x> | bash -
apt-get install -y nodejs


 # Feche o terminal e abra novamente para as alterações fazerem efeito.


# Por fim, execute os seguintes comandos no terminal:
node -v
npm -v


# Yarn 1
# Linux (Ubuntu/Debian)
# Para instalar o Yarn 1 no Linux vamos começar configurando o repositório do Yarn executando:
curl -sS <https://dl.yarnpkg.com/debian/pubkey.gpg> | sudo apt-key add -
echo "deb <https://dl.yarnpkg.com/debian/> stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# Instale utilizando o seguinte comando:
sudo apt update && sudo apt install yarn

# Adicione ao arquivo ~/.bashrc (ou ~/.zshrc caso você utilize o shell zsh) a seguinte linha:
# export PATH="$PATH:`yarn global bin`"

# Feche e abra o terminal novamente, em seguida rode o comando:
yarn --version

# Caso retorne a versão do Yarn (acima de 1.0, abaixo de 2.0), a instalação ocorreu com sucesso.

# Instalar o pacote express:

npm install express --save
# ou
yarn add express

# Criar uma pasta dentro do projeto_node
# src e dentro dela um server.ts


# Instalar types/express:

npm install --save @types/express
# ou
yarn add @types/express -D

# Instalar typescript:

npm install typescript --save-dev

# Antes de iniciar o tesc que vai gerar uma tsconfig.json

# Instalar terminal ubuntu:
sudo apt install node-typescript

# Criar a pasta tsconfig.json
tsc --init

# Dentro do tsconfig.json alterar de “true” para “false”
"strict": false,

# Dentro do package.json incluir o scripts :
"scripts": {
   "dev": "ts-node-dev src/server.ts"
 },

# Testar a aplicacao, execute ela:
yarn dev

# 2 dia de aula 

# Instalação do TypORM 

fonte : https://typeorm.io/#/

# Install the npm package:
npm install typeorm --save

# You need to install reflect-metadata shim:

 npm install reflect-metadata --save

 and import it somewhere in the global place of your app (for example in app.ts):

 import "reflect-metadata";
 
# Vamos usar o SQlite:
 # SQLite
 npm install sqlite3 --save

# Caso a versão usada de comando seja o yarn
yarn add typeorm reflect-metadata sqlite3 

# Criar um arquivo na raiz do projeto, conforme orientacao da documentação typeorm:
# fonte : https://typeorm.io/#/using-ormconfig
ormconfig.json
{
   "type": "sqlite",
   "host": "localhost",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test"
}

# Criar dentro da pasta src:
# pasta : database
# dentro de database criar um arquivo : index.ts
# esse arquivo index.ts vai conversar com meu ormconfig.json, usando para conexão com o banco de dados
# Dentro do server.ts:
import "/.database";

# Dentro da pasta database :
# Criar uma pasta migrations

# Configuracoes necessarias para usar a migrations:
ormconfig.json
"database": "./src/database/database.sqlite",
 "migrations":["./src/database/migrations/**.ts"],
 "cli": {
   "migrationsDir":"./src/database/migrations"
 }

package.json
"scripts": {
   "dev": "ts-node-dev src/server.ts",
   "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
 },

# Exite duas formas importando ou usando a pasta que veio junto com a importacao do ts-node, entao indico o caminho da pasta dentro do projeto.

# Criando migrations:
yarn typeorm migration:create -n CreateSettings

# Automaticamente vai ser gerado uma classe class CreateSettings1618975690310, dentro dessa classe vamos configurar ela com os dados da nossa tabela

# Configurações feita na class class CreateSettings1618975690310:

# Inseri o Table
import {MigrationInterface, QueryRunner, Table} from "typeorm";

Crio a tabela
public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
           new Table({
               name: "settings",
               columns: [
                   {
                       name: "id",
                       type: "uuid",
                       isPrimary: true
                   },
                   {
                       name: "username",
                       type: "varchar"
                   },
                   {
                       name: "chat",
                       type: "boolean",
                       default: true
                   },
                   {
                       name: "updated_at",
                       type: "timestamp",
                       default: "now()"
                   },
                   {
                       name: "created_at",
                       type: "timestamp",
                       default: "now()"
                   }
               ]
           })
       )
   }



# Atualização automaticamente com a hora local, tanto no update quanto na criação.
{
                       name: "updated_at",
                       type: "timestamp",
                       default: "now()"
                   },
                   {
                       name: "created_at",
                       type: "timestamp",
                       default: "now()"
                   }

# Método para usado para dar drop na tabela
public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable("settings");
   }

# Feito as configuracoes da classe migration execute o comando:
yarn typeorm migration:run

# Criar uma pasta entities dentro src
# Gerar dentro dessa pasta um arquivo Settings.ts:
import {
 Entity,
 Column,
 CreateDateColumn,
 UpdateDateColumn,
 PrimaryColumn
} from "typeorm";
 
import { v4 as uuid } from "uuid";
 
 
@Entity("settings")
class Settings {
 
 @PrimaryColumn()
 id: string;
 
 @Column()
 username: string;
 
 @Column()
 chat: boolean;
 
 @UpdateDateColumn()
 updated_at: Date;
 
 @CreateDateColumn()
 created_at: Date;
 
 constructor() {
     if (!this.id) {
         this.id = uuid();
     }
 }
}
 
export { Settings }

# Um destaque fica para uuid, o projeto que fica responsável por criar o id, com isso indeferente qual banco estamos usando,ele vai funcionar.

# Configurar antes :
yarn add uuid
yarn add @types/uuid -D

import { v4 as uuid } from "uuid";

constructor() {
     if (!this.id) {
         this.id = uuid();
     }


# Configuração necessária dentro do tsconfig.json
"experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

# Configurar a minha onconfig.json add:
"entities": ["./src/entities/**.ts"],

# Crio as tabelas:
yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:create -n CreateMessages

# Configuro as classes geradas pela migration

# Dou um run migration para criar as tabelas
yarn typeorm migration:run

# Aula 4

# Protocolo WS - Websocket

# Envia resposta e recebe, so encerra quando o cliente se desconecta.

# Para usar esse protocolo vamos instalar o socket.io
yarn add socket.io
yarn add @types/socket.io -D

# Instalar ejs
yarn add ejs

# Para trabalhar com cliente
yarn add socket.io-client

# Criar uma tabela connections
yarn typeorm migration:create -n CreateConnections

# Instalacao Mustache - consegue passar variaveis por meio de um template, nesse projeto vamos usar para passar mensagens chat
html
 <script src="/socket.io/socket.io.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.4/dayjs.min.js"></script>
 <script src="https://unpkg.com/mustache@latest"></script>
 <script src="/js/chat.js"></script>

