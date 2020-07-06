# Todo List (sequelize)
A simple todo list built with Node.js and Express.

## Features
1. Add, read, edit, delete todo
2. Todos all done with one-click
3. Move all todos to trash with one-click
4. Log-in with local or Facebook account

![](https://i.imgur.com/sgrwcxB.png)


## Getting Started
1. Clone repository to your local computer
```
$ git clone https://github.com/ShihTingJustin/todo-sequelize.git
```
2. Install by [npm](https://www.npmjs.com/)
```
$ npm install
```
3. Download env.example from [here](https://bit.ly/38vtO09)

4. Put **env.example** in root directory and rename to **.env** in editor 

5. Enter your facebook ID and SECRET in **.env**
(You can apply from [facebook](https://developers.facebook.com/))

6. Use seed data 
```
npx sequelize db:seed:all
```
7. Execute 
```
$ npm run dev 
```
8. Terminal show the message 
 ```
App is running on http://localhost:3000
```
Now you can browse the website on 
```
http://localhost:3000
```

## Test Account

```
email: root@example.com
password: 1234567
```

## Built With
* Node.js: 10.15.0
* bcryptjs: 2.4.3
* body-parser: 1.19.0
* connect-flash: 0.1.1
* dotenv: 8.2.0
* express: 4.17.1
* express-session: 1.17.1
* express-handlebars: 4.0.4
* method-override: 3.0.0
* mysql2: 2.1.0
* passport: 0.4.1
* passport-facebook: 3.0.0
* passport-local: 1.0.0
* sequelize: 5.21.13
* sequelize-cli: 5.5.1

## Author
[Justin Huang 黃士庭](https://www.linkedin.com/in/justinhuang777/) 
