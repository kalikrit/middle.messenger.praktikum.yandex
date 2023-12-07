# Мессенджер

### ОБЩЕЕ ОПИСАНИЕ
## Проект написан на javascript использует шаблонизатор handlebars, websocket
## пользователь регистрируется и авторизуется в системе
## пользователь может создавать чаты, добавлять и удалять пользователей
## пользователь может изменять свой профиль, изменять аватар
## в чате обмен сообщениями происходит в реальном времени посредством протокола websocket

## version 3.9.9 / 8.12.2023

### проект использует:
 - node.js ^20
 - TS ^5.2.2
 - eslint ^8.49.0
 - eslint-config-airbnb ^19.0.4
 - stylelint ^15.11.0

## Установка:
npm install

## Запуск
npm run start

## Билд
npm run build

## Запус сервера express
node ./server.js

## роутинг:
неавторизованным пользователям:
- /     главная страница
- /login Авторизация
- /register Регистрация

авторизованным пользователям:
- /messenger Список чатов
- /settings Настройки пользователя


### дизайн в figma:
https://www.figma.com/file/SR5uebjW4Z4cCx1NIdYGFy/Messenger-project?type=design&node-id=0%3A1&mode=design&t=jovtXwYcgSm0loO4-1

### netlify link
https://kkononenko.netlify.app/
