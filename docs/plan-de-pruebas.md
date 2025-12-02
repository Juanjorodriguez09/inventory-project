# PLAN DE PRUEBAS – Sistema de Inventario  
**Asignatura:** Pruebas de Software  
**Proyecto Final – 2025  
Autor:** Juan José Rodríguez  
**Profesor:** José Alfredo Ramírez Espinosa  

---

# 🎯 1. OBJETIVO DEL PLAN DE PRUEBAS
Este documento presenta el sistema completo de pruebas diseñadas para garantizar el correcto funcionamiento del sistema de inventario desarrollado para el proyecto final.  
---

# 🧱 2. TIPOS DE PRUEBAS

### ✔ **2.1 Pruebas Unitarias (Jest)**
Evalúan funciones y servicios individuales del backend sin depender de la base de datos real.

### ✔ **2.2 Pruebas de Integración (Supertest + Jest)**
Comprueban endpoints completos conectados a la base de datos.

### ✔ **2.3 Pruebas End-to-End (Playwright)**
Simulan el uso real del usuario en navegador:
- Crear categoría  
- Crear producto  
- Ver producto en el listado  

### ✔ **2.4 Análisis Estático (ESLint)**
Verificar estándares de estilo, errores comunes y calidad  del código.

---

# 🗂 3. CASOS DE PRUEBA 

---

## ✔ **3.1 Pruebas Unitarias (Backend)**

### **UT-01 – Validación de creación de categoría**
| Campo                  | Detalle |
|------------------------|---------|
| **Tipo**               | Unitaria |
| **Descripción**        | Verifica que no se permita crear una categoría sin nombre. |
| **Precondiciones**     | Ninguna |
| **Pasos**              | 1. Llamar servicio createCategory("") |
| **Resultado Esperado** | Error de validación |
| **Resultado Obtenido** | OK |

---

### **UT-02 – Validar convertir el precio**
| Campo                 | Detalle |
|-----------------------|---------|
| **Tipo**              | Unitaria |
| **Descripción**       | Validar que parsePrice convierta valores con puntos y comas a número válido. |
| **Precondiciones**    | Ninguna |
| **Pasos**             | parsePrice("1.500.000") |
| **Resultado Esperado**| 1500000 |
| **Resultado Obtenido**| OK |

---

## ✔ **3.2 Pruebas de Integración (API)**

### **INT-01 – Crear categoría con la API**
| Campo                  | Detalle |
|------------------------|---------|
| **Tipo**               | Integración |
| **Descripción**        | Validar creación de categoría vía POST /categories |
| **Precondiciones**     | Base de datos activa |
| **Pasos**              | Enviar payload { "name": "Prueba" } |
| **Resultado Esperado** | 201, objeto creado |
| **Resultado Obtenido** | OK |



### **INT-02 – Crear producto vía API**
| Campo                 | Detalle |
|---------------------- |---------|
| **Tipo**              | Integración |
| **Descripción**       | Validar que POST /products cree un producto correctamente. |
| **Precondiciones**    | Categoría creada |
| **Pasos**             | POST /products con valores válidos |
| **Resultado Esperado**| 201, producto visible en GET /products |
| **Resultado Obtenido**| OK |



## ✔ **3.3 Pruebas End-to-End (Playwright)**

### **E2E-01 – Flujo completo: Crear categoría, crear producto, listar producto**
| Campo                 | Detalle |
|---------------------- |---------|
| **Tipo**              | End-to-End |
| **Descripción**       | Simula el uso real del sistema web. |
| **Precondiciones**    | Backend corriendo, frontend corriendo |
| **Pasos**             |  1. Ir a => categories  
|                       |  2. Crear categoría “Cat E2E {timestamp}”  
|                       | 3. Ir a => products  
|                       | 4. Crear producto asociado  
|                       |  5. Validar que el producto aparece en el listado
| **Resultado Esperado**| Producto visible en tabla |
| **Resultado Obtenido**| OK (Prueba pasó) |

---

## ✔ **3.4 Análisis Estático**

### **LINT-01 – Ejecución de ESLint**
| Campo                  | Detalle |
|------------------------|---------|
| **Tipo**               | Estático |
| **Descripción**        | Detectar errores de sintaxis y estilo con `npm run lint`. |
| **Resultado Esperado** | Sin errores críticos |
| **Resultado Obtenido** | OK |

---

# 🧪 4. MATRIZ RESUMEN DE PRUEBAS

| ID     |   Tipo      | Estado      |
|--------|-------------|-------------|
| UT-01  | Unitaria    | ☑️ Aprobada |
| UT-02  | Unitaria    | ☑️ Aprobada |
| INT-01 | Integración | ☑️ Aprobada |
| INT-02 | Integración | ☑️ Aprobada |
| E2E-01 | End-to-End  | ☑️ Aprobada |
| LINT-01| Estático    | ☑️ Aprobada |

---

# 🏁 5. CONCLUSIONES

El sistema de inventario supera exitosamente todas las pruebas realizadas.  
Se validó funcionamiento de:

- CRUD de categorías  
- CRUD de productos  
- Validaciones internas  
- Flujo completo del usuario final  
- Integración con base de datos  
- Comportamiento del frontend  
- Calidad del código mediante ESLint  
---

# 📎 6. ANEXOS

- Reportes Playwright (ruta: `inventory-frontend/test-results/`)
- Reporte de Jest (unidad e integración)
- Output de ESLint
- Código fuente de pruebas en:
  - `inventory-backend/tests/`
  - `inventory-frontend/tests/e2e/`


  