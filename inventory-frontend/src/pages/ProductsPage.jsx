import { useState, useEffect } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";


// Parsear precio
function parsePrice(raw) {
  if (!raw) return NaN;
  const normalized = raw
    .toString()
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(normalized);
}

function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function ProductsPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
    });
    setEditingId(null);
  };

  // Validar campos obligatorios
  const validateRequiredFields = () => {
    const missing = [];

    const priceNumber = parsePrice(form.price);
    const stockNumber = form.stock === "" ? NaN : Number(form.stock);

    if (!form.name.trim()) missing.push("Nombre");
    if (Number.isNaN(priceNumber) || priceNumber <= 0) missing.push("Precio");
    if (Number.isNaN(stockNumber) || stockNumber < 0) missing.push("Stock");
    if (!form.categoryId) missing.push("Categoría");

    return { missing, priceNumber, stockNumber };
  };

  // Crear producto
  const createProduct = async () => {
    const { missing, priceNumber, stockNumber } = validateRequiredFields();

    if (missing.length > 0) {
      setFeedback({
        type: "error",
        text:
          "Los siguientes campos son obligatorios o no son válidos: " +
          missing.join(", ") +
          ".",
      });
      return;
    }

    try {
      await api.post("/products", {
        name: form.name.trim(),
        description: form.description.trim(),
        price: priceNumber,
        stock: stockNumber,
        categoryId: Number(form.categoryId),
      });

      resetForm();
      setFeedback({
        type: "success",
        text: "Producto creado correctamente.",
      });
      loadProducts();
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Error al crear el producto.",
      });
    }
  };

  // Actualizar producto
  
  const updateProduct = async () => {
    const { missing, priceNumber, stockNumber } = validateRequiredFields();

    if (!editingId || missing.length > 0) {
      if (missing.length > 0) {
        setFeedback({
          type: "error",
          text:
            "Los siguientes campos son obligatorios o no son válidos: " +
            missing.join(", ") +
            ".",
        });
      }
      return;
    }

    try {
      await api.put(`/products/${editingId}`, {
        name: form.name.trim(),
        description: form.description.trim(),
        price: priceNumber,
        stock: stockNumber,
        categoryId: Number(form.categoryId),
      });

      resetForm();
      setFeedback({
        type: "success",
        text: "Producto actualizado correctamente.",
      });
      loadProducts();
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Error al actualizar el producto.",
      });
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      categoryId: String(product.categoryId ?? ""),
    });
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      if (editingId === id) resetForm();
      setFeedback({
        type: "success",
        text: "Producto eliminado correctamente.",
      });
      loadProducts();
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Error al eliminar el producto.",
      });
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);


  const handleChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "stock") {
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, stock: value }));
      }
      return;
    }

    if (field === "price") {
      setForm((prev) => ({ ...prev, price: value }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="content-grid">
      <section className="card">
        <Alert feedback={feedback} onClose={() => setFeedback(null)} />

        <div className="card-header">
          <h2 className="card-title">
            {editingId ? "Editar producto" : "Nuevo producto"}
          </h2>
          <p className="card-subtitle">
            {editingId
              ? "Actualiza la información del producto seleccionado."
              : "Registra productos y asígnalos a una categoría."}
          </p>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="label" htmlFor="name">Nombre</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Ej: Café molido 500g"
            />
          </div>

          <div className="form-field">
            <label className="label" htmlFor="description">Descripción</label>
            <input
              id="description"
              className="input"
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Descripción breve del producto (opcional)"
            />
          </div>

          <div className="form-row-inline">
            <div className="form-field">
              <label className="label" htmlFor="price">Precio</label>
              <input
                id="price"
                className="input"
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={handleChange("price")}
                placeholder="Ej: 2.000.000"
              />
            </div>

            <div className="form-field">
              <label className="label" htmlFor="stock">Stock</label>
              <input
                id="stock"
                className="input"
                type="text"
                inputMode="numeric"
                value={form.stock}
                onChange={handleChange("stock")}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="label" htmlFor="categoryId">Categoría</label>
            <select
              id="categoryId"
              className="select"
              value={form.categoryId}
              onChange={handleChange("categoryId")}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="button"
              onClick={editingId ? updateProduct : createProduct}
              type="button"
            >
              {editingId ? "Guardar cambios" : "+ Crear producto"}
            </button>

            {editingId && (
              <button
                className="button"
                style={{ background: "#6b7280" }}
                type="button"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Productos registrados</h2>
          <p className="card-subtitle">
            Resumen de productos y su categoría asociada.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="card-subtitle">Todavía no hay productos.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
  <thead>
    <tr>
      <th>Producto</th>
      <th>Descripción</th>
      <th>Categoría</th>
      <th>Precio</th>
      <th>Stock</th>
      <th style={{ width: 170 }}>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {products.map((p) => (
      <tr key={p.id}>
        <td>{p.name}</td>
        <td className="table-description">
          {p.description || "-"}
        </td>
        <td>{p.category?.name || "-"}</td>
        <td>{formatPrice(p.price)}</td>
        <td>{p.stock}</td>
        <td>
          <div className="table-actions">
            <button
              className="button button-sm"
              style={{ background: "#4b5563" }}
              type="button"
              onClick={() => handleEdit(p)}
            >
              Editar
            </button>
            <button
              className="button button-sm"
              style={{ background: "#ef4444" }}
              type="button"
              onClick={() => handleDelete(p.id)}
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}
      </section>
    </div>
  );
}