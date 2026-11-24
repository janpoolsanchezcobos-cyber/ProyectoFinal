import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import Categorias from "./pages/Categorias";
import Productos from "./pages/Productos";
import './App.css'


function Inicio() {
  return (
    <section>
      <h2>Bienvenido a Vida Verde</h2>
      <p>
        Explora y administra productos ecológicos y de cuidado ambiental desde un
        catálogo claro y sencillo.
      </p>
      <Link to="/productos" className="vv-boton">
        Ver catálogo de productos
      </Link>
    </section>
  );
}



function NuevoProducto() {
  return (
    <section>
      <h2>Nuevo producto</h2>
      <p>Aquí irá el formulario para registrar un producto ecológico.</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutPrincipal>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/nuevo-producto" element={<NuevoProducto />} />
        </Routes>
      </LayoutPrincipal>
    </BrowserRouter>
  );
}

export default App;
