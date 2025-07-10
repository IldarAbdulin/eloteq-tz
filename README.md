# Eloteq TZ

## 🚀 Локальный запуск проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/IldarAbdulin/eloteq-tz.git
cd eloteq-tz
```

### 2. Установка зависимостей

С помощью npm или yarn:

```bash
npm install
# или
yarn install
```

### ⚠️ ВАЖНО: Настройка GitHub OAuth

Перед запуском проекта необходимо создать OAuth приложение на GitHub:

1. Перейдите по ссылке:  
   [GitHub Auth Settings](https://github.com/settings/developers)

2. Нажмите **"New OAuth App"**

3. Укажите следующие поля:

- **Application Name** — любое имя (например: `My React OAuth App`)
- **Homepage URL** — `http://localhost:5173`
- **Authorization callback URL** — `http://localhost:5173/auth/callback`

4. После создания скопируйте `Client ID` и `Client Secret`

---

### 3. Создание `.env` файла

В корне проекта создайте файл `.env` и добавьте в него следующие переменные:

```env
VITE_GITHUB_CLIENT_ID=""          # ваш client id
VITE_GITHUB_CLIENT_SECRET=""      # ваш client secret
VITE_REDIRECT_URI="http://localhost:5173/auth/callback"
VITE_SERVER_URL="http://localhost:4000/api"
VITE_GITHUB_OAUTH_URL="https://github.com/login/oauth"
VITE_GITHUB_API_URL="https://api.github.com"
```

---

### 4. Запуск проекта

После завершения всех настроек запустите проект:

##### Версия Node.js должна быть больше или равен 20.19.0 или меньше или чтоб был равен 22.12.0 версии

```bash
npm run dev
# или
yarn dev
```

Открываем второй терминал и запускаем сервер:

```bash
npm run server
# или
yarn server
```

Проект будет доступен по адресу:  
[http://localhost:5173](http://localhost:5173)

Сервер будет доступен по адресу:  
[http://localhost:4000](http://localhost:4000)
