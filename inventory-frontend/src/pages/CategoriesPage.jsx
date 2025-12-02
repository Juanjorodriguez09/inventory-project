import { useState, useEffect } from "react";
import { api } from "../api/api";
import Alert from "../components/Alert";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const resetForm = () => {
    setName("");
    setEditingId(null);
  };

  const createCategory = async () => {
    if (!name.trim()) {
      setFeedback({
        type: "error",
        text: "El nombre de la categoría es obligatorio.",
      });
      return;
    }

    try {
      await api.post("/categories", { name: name.trim() });
      setFeedback({ type: "success", text: "Categoría creada correctamente." });
      resetForm();
      loadCategories();
    } catch (err) {
      setFeedback({ type: "error", text: "Error al crear la categoría." });
    }
  };

  const updateCategory = async () => {
    if (!name.trim()) {
      setFeedback({
        type: "error",
        text: "El nombre de la categoría es obligatorio.",
      });
      return;
    }

    try {
      await api.put(`/categories/${editingId}`, { name: name.trim() });
      setFeedback({
        type: "success",
        text: "Categoría actualizada correctamente.",
      });
      resetForm();
      loadCategories();
    } catch (err) {
      setFeedback({ type: "error", text: "Error al actualizar la categoría." });
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setFeedback({
        type: "success",
        text: "Categoría eliminada correctamente.",
      });
      loadCategories();
    } catch (err) {
      if (err.response?.status === 409) {
        setFeedback({
          type: "error",
          text: "No puedes eliminar esta categoría porque tiene productos asociados.",
        });
      } else {
        setFeedback({ type: "error", text: "Error al eliminar categoría." });
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="content-grid">
      <section className="card">
        <Alert feedback={feedback} onClose={() => setFeedback(null)} />

        <div className="card-header">
          <h2 className="card-title">
            {editingId ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <p className="card-subtitle">
            {editingId
              ? "Actualiza el nombre de la categoría."
              : "Crea una nueva categoría para organizar tus productos."}
          </p>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="label">Nombre de la categoría</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Lácteos, Bebidas, Tecnología"
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="button"
              type="button"
              onClick={editingId ? updateCategory : createCategory}
            >
              {editingId ? "Guardar cambios" : "+ Crear categoría"}
            </button>

            {editingId && (
              <button
                className="button"
                type="button"
                style={{ background: "#6b7280" }}
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
          <h2 className="card-title">Categorías registradas</h2>
          <p className="card-subtitle">
            Estas categorías estarán disponibles al crear productos.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="card-subtitle">Aún no hay categorías creadas.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th style={{ width: 170 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="button button-sm"
                          type="button"
                          style={{ background: "#4b5563" }}
                          onClick={() => handleEdit(cat)}
                        >
                          Editar
                        </button>

                        <button
                          className="button button-sm"
                          type="button"
                          style={{ background: "#ef4444" }}
                          onClick={() => handleDelete(cat.id)}
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