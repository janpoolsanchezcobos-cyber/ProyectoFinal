import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function LayoutPrincipal({ children }) {
  return (
    <div className="vv-contenedor">
      <Header />
      <Menu />
      <main className="vv-contenido aparecer">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default LayoutPrincipal;