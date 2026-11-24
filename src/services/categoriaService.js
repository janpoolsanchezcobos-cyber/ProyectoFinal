const API_PRODUCTS_URL = "http://localhost:3000/api/products";
const STORAGE_KEY = "vida_verde_categorias";

function leerGuardadas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function guardarEnStorage(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export async function obtenerCategorias() {
  const respuesta = await fetch(API_PRODUCTS_URL);
  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos para obtener categorías.");
  }
  const data = await respuesta.json();
  const productos = Array.isArray(data)
    ? data
    : data.products || data.data || data.items || [];

  const desdeProductos = productos
    .map((p) => p.category)
    .filter((c) => typeof c === "string" && c.trim() !== "");

  let guardadas = leerGuardadas();

  if (guardadas === null) {
    const unicas = [...new Set(desdeProductos)].sort((a, b) => a.localeCompare(b));
    guardadas = unicas.map((nombre, index) => ({
      id: index + 1,
      nombre,
    }));
    guardarEnStorage(guardadas);
  } else {
    const nombresExistentes = new Set(guardadas.map((c) => c.nombre.toLowerCase()));
    let maxId = guardadas.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0);

    for (const nombre of desdeProductos) {
      if (!nombresExistentes.has(nombre.toLowerCase())) {
        maxId += 1;
        guardadas.push({ id: maxId, nombre });
        nombresExistentes.add(nombre.toLowerCase());
      }
    }
    guardarEnStorage(guardadas);
  }

  return guardadas;
}

export async function crearCategoria({ nombre }) {
  const limpio = nombre.trim();
  const actual = await obtenerCategorias();

  if (actual.some((c) => c.nombre.toLowerCase() === limpio.toLowerCase())) {
    throw new Error("Esa categoría ya existe.");
  }

  const maxId = actual.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0);
  const nueva = { id: maxId + 1, nombre: limpio };
  const actualizada = [...actual, nueva];
  guardarEnStorage(actualizada);
  return nueva;
}

export async function actualizarCategoria(id, { nombre }) {
  const limpio = nombre.trim();
  const actual = await obtenerCategorias();
  const actualizada = actual.map((c) =>
    c.id === id ? { ...c, nombre: limpio } : c
  );
  guardarEnStorage(actualizada);
  return actualizada.find((c) => c.id === id);
}

export async function eliminarCategoria(id) {
  const actual = await obtenerCategorias();
  const actualizada = actual.filter((c) => c.id !== id);
  guardarEnStorage(actualizada);
  return true;
}