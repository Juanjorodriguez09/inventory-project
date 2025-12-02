import { useState } from "react";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [page, setPage] = useState("categories");

  return (
    <div className="app-layout">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1 className="app-title">Inventory Manager</h1>
            <p className="app-subtitle">
              Administra categorías y productos desde una interfaz sencilla.
            </p>
          </div>
          <span className="badge">Proyecto Pruebas de Software</span>
        </header>

        <div className="tabs">
          <button
            className={`tab-button ${
              page === "categories" ? "active" : ""
            }`}
            onClick={() => setPage("categories")}
          >
            Categorías
          </button>
          <button
            className={`tab-button ${
              page === "products" ? "active" : ""
            }`}
            onClick={() => setPage("products")}
          >
            Productos
          </button>
        </div>

        {page === "categories" && <CategoriesPage />}
        {page === "products" && <ProductsPage />}
      </div>
    </div>
  );
}

export default App;
