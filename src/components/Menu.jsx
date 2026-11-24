import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="vv-menu" aria-label="Navegación principal">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "vv-link activo" : "vv-link")}>
        Inicio
      </NavLink>
      <NavLink to="/productos" className={({ isActive }) => (isActive ? "vv-link activo" : "vv-link")}>
        Productos
      </NavLink>
      <NavLink to="/categorias" className={({ isActive }) => (isActive ? "vv-link activo" : "vv-link")}>
        Categorías
      </NavLink>
      <NavLink to="/nuevo-producto" className={({ isActive }) => (isActive ? "vv-link activo" : "vv-link")}>
        Nuevo producto
      </NavLink>
    </nav>
  );
}

export default Menu;