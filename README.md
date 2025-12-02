# 📦 Sistema de Inventario – Proyecto Final  
**Asignatura:** Pruebas de Software  
**Programa:** Ingeniería de Software  
**Autor:** Juan José Rodríguez  
**Año:** 2025  

---

## 📑 Descripción del Proyecto
Este proyecto implementa un **Sistema Completo de Gestión de Inventario**, desarrollado como entregable final para la asignatura Pruebas de Software.  
Incluye:

- **API REST profesional** con arquitectura por capas  
- **Base de datos con Prisma ORM**  
- **Frontend moderno con React + Vite**  
- **Pruebas automatizadas:** unitarias, integración y E2E  
- **Análisis estático de código**  
- **Pipeline CI/CD en GitHub Actions**  
- **Despliegue:** API (Render) y Frontend (Vercel)**  

El objetivo es demostrar un proceso completo de aseguramiento de calidad y un flujo profesional de desarrollo.

---

# 🧱 Arquitectura del Proyecto
inventory-project/
│── inventory-api/        → Backend (API REST + Prisma + Tests)
│── inventory-frontend/   → Frontend (React, Playwright E2E)
│── .github/workflows/    → Pipeline CI
│── README.md

---

# 🚀 Tecnologías Utilizadas

### 🔹 Backend
- Node.js  
- Express  
- Prisma ORM  
- SQLite en desarrollo / PostgreSQL en producción  
- Jest (unitarias e integración)  
- ESLint  

### 🔹 Frontend
- React  
- Vite  
- Playwright (E2E)  
- CSS modular con estilos personalizados  

### 🔹 DevOps
- GitHub Actions  
- Render (API)  
- Vercel (Frontend)  

---

# 🗄️ Modelo de Base de Datos

## Tabla `categories`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | PK, autoincrement |
| name | String | Nombre de la categoría |

## Tabla `products`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | PK, autoincrement |
| name | String | Nombre del producto |
| description | String? | Descripción opcional |
| price | Int | Precio del producto |
| stock | Int | Existencias |
| categoryId | Int | FK → categories.id |

---

# 🌐 API REST

## Categorías
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| GET | /categories | Listar |
| POST | /categories | Crear |
| PUT | /categories/:id | Actualizar |
| DELETE | /categories/:id | Eliminar |

## Productos
| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| GET | /products | Listar |
| POST | /products | Crear |
| PUT | /products/:id | Actualizar |
| DELETE | /products/:id | Eliminar |

---

# 🧪 Pruebas Automatizadas

## ✔️ Pruebas Unitarias (Jest)
Validan lógica de servicios (`product.service.js`, `category.service.js`).

## ✔️ Pruebas de Integración (Jest + Supertest)
Validan:
- API real
- Base de datos Prisma
- Flujo completo CRUD

## ✔️ Pruebas E2E (Playwright)
Automatizan el flujo:

1. Crear categoría  
2. Crear producto  
3. Validar producto en el listado  

Se ejecutan con:

```bash
npm run test:e2e
