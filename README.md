# README.md

# Green API Vue Project

## Описание

Этот проект представляет собой веб-приложение, разработанное с использованием Vue.js, которое взаимодействует с GREEN-API. Приложение позволяет пользователям вводить параметры подключения и вызывать методы API для получения настроек, отправки сообщений и файлов.

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone <URL_репозитория>
   cd green-api-vue
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите приложение:
   ```bash
   npm run dev
   ```

## Использование

1. Откройте приложение в браузере по адресу `http://localhost:3000`.
2. Введите `idInstance` и `ApiTokenInstance` в форму.
3. Используйте кнопки для вызова методов GREEN-API:
   - `getSettings`
   - `sendMessage`
   - `sendFileByUrl`
4. Ответы от API будут отображаться в поле для чтения.

## Структура проекта

```
green-api-vue
├── src
│   ├── components
│   │   ├── ApiForm.vue
│   │   └── ResponseDisplay.vue
│   ├── services
│   │   └── greenApi.js
│   ├── App.vue
│   └── main.js
├── public
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Лицензия

Этот проект лицензирован под MIT License.