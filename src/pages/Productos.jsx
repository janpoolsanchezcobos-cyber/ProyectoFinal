import { useEffect, useState } from "react";
import { obtenerProductos, eliminarProducto } from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarCategorias() {
    try {
      const listaCats = await obtenerCategorias();
      setCategorias(listaCats);
    } catch {
      // Si falla categorías, no bloquea el listado de productos
    }
  }

  async function cargarProductos(textoBusqueda = busqueda, catFiltro = categoriaSeleccionada) {
    setCargando(true);
    setError("");
    try {
      const data = await obtenerProductos({
        search: textoBusqueda,
        category: catFiltro,
      });
      setProductos(data);
    } catch (err) {
      setError(err.message || "Error al obtener productos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  useEffect(() => {
    cargarProductos(busqueda, categoriaSeleccionada);
  }, [busqueda, categoriaSeleccionada]);

  async function handleEliminar(producto) {
    const nombre = producto.name || producto.nombre || `ID ${producto.id}`;
    const confirmado = window.confirm(`¿Seguro que deseas eliminar "${nombre}"?`);
    if (!confirmado) return;

    try {
      await eliminarProducto(producto.id);
      await cargarProductos(busqueda, categoriaSeleccionada);
    } catch (err) {
      setError(err.message || "No se pudo eliminar el producto.");
    }
  }

  return (
    <section>
      <h2>Productos</h2>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          {categorias.map((cat) => {
            const valor = typeof cat === "string" ? cat : cat.nombre;
            return (
              <option key={valor} value={valor}>
                {valor}
              </option>
            );
          })}
        </select>
      </div>

      {cargando && <p>Cargando productos...</p>}
      {!cargando && error && <p>⚠️ {error}</p>}

      {!cargando && !error && productos.length === 0 && (
        <p>No se encontraron productos con ese criterio.</p>
      )}

      {!cargando && !error && productos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name || prod.nombre}</td>
                <td>{prod.category || prod.categoria || "-"}</td>
                <td>{prod.price ?? prod.precio ?? "-"}</td>
                <td>
                  <button type="button" onClick={() => handleEliminar(prod)}>
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