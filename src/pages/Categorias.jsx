import { useEffect, useState } from "react";
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categoriaService";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Cargar lista al iniciar
  const cargarCategorias = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      setError(err.message || "Error al conectar con la API.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Registrar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      setGuardando(true);
      setError("");

      if (idEditando) {
        await actualizarCategoria(idEditando, { nombre: nombre.trim() });
      } else {
        await crearCategoria({ nombre: nombre.trim() });
      }

      setNombre("");
      setIdEditando(null);
      await cargarCategorias(); // Refresca la lista visual
    } catch (err) {
      setError(err.message || "No se pudo guardar la categoría.");
    } finally {
      setGuardando(false);
    }
  };

  // Preparar edición
  const handleEditar = (cat) => {
    setIdEditando(cat.id);
    setNombre(cat.nombre);
    setError("");
  };

  const handleCancelar = () => {
    setIdEditando(null);
    setNombre("");
    setError("");
  };

  // Eliminar previa confirmación
  const handleEliminar = async (id, nombreCat) => {
    const confirmado = window.confirm(
      `¿Seguro que deseas eliminar la categoría "${nombreCat}"?`
    );
    if (!confirmado) return;

    try {
      setError("");
      await eliminarCategoria(id);
      await cargarCategorias(); // Refresca la lista visual
    } catch (err) {
      setError(err.message || "Error al eliminar la categoría.");
    }
  };

  return (
    <section>
      <h2>Gestión de Categorías</h2>

      {/* Mensaje de error */}
      {error && (
        <p style={{ color: "#b00020", fontWeight: "bold" }}>⚠️ {error}</p>
      )}

      {/* Formulario de registro / edición */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Nombre de la categoría (ej. Higiene, Hogar...)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />

        <button type="submit" className="vv-boton" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : idEditando
            ? "Actualizar categoría"
            : "Registrar categoría"}
        </button>

        {idEditando && (
          <button
            type="button"
            onClick={handleCancelar}
            style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Mensaje de carga o listado */}
      {cargando ? (
        <p>Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <p>No hay categorías registradas todavía.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditar(cat)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEliminar(cat.id, cat.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Categorias;