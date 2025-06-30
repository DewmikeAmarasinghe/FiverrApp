### Fiverr Clone Monorepo

**Deployed Link**: [https://fiverr-production-e82c.up.railway.app/](https://fiverr-production-e82c.up.railway.app/)

---

Modern full‑stack Fiverr‑style marketplace built with a Node.js/Express/MongoDB backend and a React (React Router v7) frontend. This monorepo contains two apps:

- `Backend`: Express API with JWT auth (httpOnly cookies), MongoDB via Mongoose, CORS, and REST endpoints for users, gigs, orders, messages, conversations, and reviews.
- `Frontend`: React 19 with React Router 7 SSR/streaming, Vite 6 tooling, Tailwind (via `@tailwindcss/vite`), and Axios for API calls.

---

### Feature Status

- **Fully implemented (backend + frontend)**

  - **Auth**: Register, Login, Logout via JWT httpOnly cookies (`POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`). Navbar logout is wired.
  - **Gigs**: List with filters/sort and view details (`GET /api/gigs?cat=&min=&max=&sort=&search=`, `GET /api/gigs/single/:id`). Frontend pages `Gigs.jsx` and `Gig.jsx` are wired.
  - **Users**: Fetch user by id (`GET /api/users/:id`). Gig page displays seller info.
  - **Reviews**: Create and list reviews on gig page (`POST /api/reviews`, `GET /api/reviews/:gigId`). Delete own review exists in backend (`DELETE /api/reviews/:id`) but UI is not added yet.

- **Frontend-only (pending backend endpoints/UI wiring)**
  - **My Gigs**: UI uses static data; should fetch seller gigs and delete via API.
    - Needs: `GET /api/gigs?userId=<sellerId>` in UI and use `DELETE /api/gigs/:id`.
  - **Add Gig form**: UI built but not wired to create gig and upload images.
    - Needs: wire `POST /api/gigs` and Cloudinary upload via `Frontend/app/utils/upload.js`.
  - **Orders**: UI uses mock data; backend routes are not implemented.
    - Needs (backend): implement `/api/orders` (create, list by role, status updates, optional payments).
  - **Messages/Conversations**: UI uses mock data; backend routes are not implemented.
    - Needs (backend): implement `/api/conversations` and `/api/messages` (create conversation, list threads, list/send messages).
  - **Become Seller**: UI attempts `PATCH /user/:id` which does not exist and path should be plural.
    - Needs (backend): add `PATCH /api/users/:id`. Needs (frontend): call `/api/users/:id`.

---

### Tech Stack

- **Backend**: Node.js ≥ 18, Express 5, Mongoose 8, JSON Web Tokens, bcrypt, cookie‑parser, CORS
- **Frontend**: React 19, React Router 7 (`@react-router/dev`), Vite 6, Tailwind 4, TanStack Query 5, Axios, Swiper
- **Database**: MongoDB (Atlas or self‑hosted)
- **Media**: Cloudinary image uploads (client‑side)

---

### Repository Structure

```
Fiverr/
  Backend/              # Express API
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
    package.json
    Procfile
  Frontend/             # React + React Router app
    app/
      components/
      layouts/
      pages/
      utils/
      routes.js
    public/
    vite.config.ts
    package.json
  package.json          # Monorepo helper scripts (backend only)
  Procfile              # Root process file (optional)
  README.md
```

---

### Environment Variables

Create `.env` files as shown below.

- Backend (`Backend/.env`):

```bash
# Server
NODE_ENV=development
PORT=8000

# Database
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority

# Auth
JWT_KEY=replace-with-a-secure-random-secret

# CORS / Frontend origin(s)
FRONTEND_URL=http://localhost:5173
# Comma-separated list of additional allowed origins
CORS_ALLOWED_ORIGINS=

# Optional (some hosts like Railway expose these)
RAILWAY_PUBLIC_DOMAIN=
RAILWAY_STATIC_URL=
```

- Frontend (`Frontend/.env`):

```bash
# Used in the browser
VITE_API_BASE_URL=http://localhost:8000/api/

# Used during server-side rendering (React Router server runtime)
API_BASE_URL=http://localhost:8000/api/
```

Notes:

- The backend sets/reads an httpOnly cookie named `accessToken` for authentication.
- CORS must allow your frontend origin. Ensure `FRONTEND_URL` and/or `CORS_ALLOWED_ORIGINS` include the site where the frontend runs.
- Image uploads use Cloudinary in `Frontend/app/utils/upload.js`. Replace the cloud name and preset for your account if needed.

---

### Installation

Run installs in both apps.

```bash
# from repo root
npm install              # installs backend via postinstall

# install frontend deps
cd Frontend
npm install
```

---

### Local Development

Run backend and frontend in separate terminals.

```bash
# Terminal 1 — Backend
cd Backend
npm run dev              # nodemon server at http://localhost:8000

# Terminal 2 — Frontend
cd Frontend
npm run dev              # React Router dev server at http://localhost:5173
```

Ensure your `.env` files are set so the frontend points to `http://localhost:8000/api/`.

---

### Production Builds

- Backend: standard Node process (uses `node server.js`).
- Frontend: build and serve with React Router’s server runtime or deploy as a fullstack app alongside the API.

```bash
# Frontend production build
cd Frontend
npm run build

# Optionally serve the built SSR server entry (local testing)
npm start
```

Deployment tips:

- Set all backend env vars (`MONGO_URI`, `JWT_KEY`, `FRONTEND_URL`, `CORS_ALLOWED_ORIGINS`, `PORT`).
- Set frontend env vars (`VITE_API_BASE_URL`, and `API_BASE_URL` for SSR).
- On platforms like Railway/Render/Heroku, expose port via `PORT` and ensure CORS origins match the deployed frontend URL.

---

### API Overview

Base URL: `{SERVER_URL}/api/`

- `POST /auth/register` — create user
- `POST /auth/login` — login, sets `accessToken` httpOnly cookie
- `POST /auth/logout` — clear session cookie
- `GET /users/:id` and other user endpoints
- `GET /gigs`, `POST /gigs`, `GET /gigs/:id`, ...
- `GET /reviews/:gigId`, `POST /reviews`, `DELETE /reviews/:id`, ...
- (Planned) `GET/POST /orders`, `GET/POST /conversations`, `GET/POST /messages`

Authentication middleware reads the cookie and attaches `req.userId` and `req.isSeller` for protected routes.

---

### Frontend Configuration

- API client: `Frontend/app/utils/newRequest.js` uses Axios with `withCredentials: true` and resolves the base URL from `VITE_API_BASE_URL` (browser) or `API_BASE_URL` (SSR). Ensure both are set.
- Routes are defined in `Frontend/app/routes.js` and rendered under `Frontend/app/layouts/MainLayout.jsx` where applicable.
- Tailwind is wired via `@tailwindcss/vite` and Vite config lives in `Frontend/vite.config.ts`.

---

### Common Issues

- 403/401 on API: confirm cookies are sent (`withCredentials: true`) and CORS allows the frontend origin with `credentials: true` on the server.
- CORS error: ensure `FRONTEND_URL` and/or `CORS_ALLOWED_ORIGINS` match the exact scheme, host, and port (e.g., `http://localhost:5173`).
- Cloudinary upload fails: update cloud name and preset in `Frontend/app/utils/upload.js` and verify your Cloudinary unsigned upload preset.

---

### Roadmap / TODO

- **Backend**

  - Implement Orders API (`/api/orders`): create order, list buyer/seller orders, status updates, payment hooks if applicable.
  - Implement Conversations (`/api/conversations`) and Messages (`/api/messages`): create conversation on order/contact, list conversations, list/send messages.
  - Add `PATCH /api/users/:id` to support account updates (Become Seller flow: `isSeller`, `phone`, `desc`).
  - Ensure gigs list supports `userId` filter (already available) and add pagination.
  - Implement payment after ordering services using Stripe

- **Frontend**

  - Wire My Gigs to backend (list own gigs via `GET /api/gigs?userId=<sellerId>`, delete via `DELETE /api/gigs/:id`).
  - Wire Add Gig to call `POST /api/gigs` + Cloudinary uploads; handle optimistic updates and validation.
  - Orders page: fetch from backend; add contact-to-conversation action.
  - Messages/Conversations pages: fetch threads, real-time UX (optional websockets/long-polling later).
  - Add UI to let sellers respond to reviews (create/update/delete response).
  - Update Become Seller to call `PATCH /api/users/:id` (plural path) when backend is ready.

- **AI Chatbot Integration (planned)**
  - Add an AI assistant for buyers to discover gigs and for sellers to draft responses with machine learning model.
  - Planned approach:
    - Backend: `/api/ai/chat` endpoint that proxies to an LLM provider (streamed responses), optional RAG using gig descriptions and seller profiles.
    - Frontend: Chat widget popup component with context (current page, gig id, user role) and streaming UI.
    - Safety: moderation checks and rate limiting.

---

### Scripts Reference

- Root
  - `npm start` — starts backend (`Backend/server.js`)
  - `npm postinstall` — installs backend deps
- Backend
  - `npm run dev` — dev server with nodemon
  - `npm start` — production start
- Frontend
  - `npm run dev` — dev server
  - `npm run build` — production build
  - `npm start` — serve built SSR entry locally

---

### Requirements

- Node.js 18+
- MongoDB instance (Atlas or local)

---

### License

This project does not include an explicit license. Add one if you plan to distribute or make it open source.
