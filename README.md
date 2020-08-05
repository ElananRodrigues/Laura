Graphql Node.js + React
=======

#Front-end e back-end
------------

Temos duas aplicações o back-end rodando graphql + node.js + postgres e front-end feiro com React .

**Iniciar o processo**
--------------------

Primeiro faça um clone do projeto em sua maquina.

```sh
$ git clone https://github.com/ElananRodrigues/Laura.git

$ cd ~/Laura
```

Precisa iniciar o banco `postgres` primeiro.

Na raiz da pasta `backend-monitor`  tem um arquivo `docker-composer.yml`.

```
$ docker-composer up -d
```
Precisa executar este comando para iniciar o banco no `docker` via `terminal`


**backend-monitor**
--------------------
Para iniciar a aplicação no backend precisa primeiro, instalar excutando o comando abaixo.

```
$ npm install
```

Apos a instalação ser concluída, `execute` este `comando` abaixo, no `terminal` para criar as `tabelas` no `banco`.

```
$ knex migrate:latest
```

Após a `criação` das tabelas no banco, precisamos inserir alguns dados para ulitzacao da aplicacao.

```
$ node config/insert.js
```

Agora podemos rodar a aplicação `backend-monitor` .

Para iniciar a aplicação, precisa rodar o comando abaixo.

```
$ npm start
```
A aplicação ira iniciar na rota  [http://localhost:4000](http://localhost:4000).

**frontend-monitor**
--------------------
Para iniciar a aplicação no frontend precisa primeiro, instalar excutando o comando abaixo.
```
$ npm install
```

Após ser concluida a instalação, precisa rodar o comando para iniciar o serviço da aplicação.

```
$ npm start
```

A aplicação ira iniciar na rota  [http://localhost:3000](http://localhost:3000).


**Login do painel**
--------------------

Os dados apresentados aqui foram incluidos no passo anterior.

**Login: dev@laura.com**

**Senha: 123456**