const API_URL = "http://localhost:3000/api/products";

export async function obtenerProductos() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }
  return await respuesta.json();
}

export async function obtenerProductoPorId(id) {
  const respuesta = await fetch(`${API_URL}/${id}`);
  if (!respuesta.ok) {
    throw new Error("No se encontró el producto solicitado.");
  }
  return await respuesta.json();
}

export async function crearProducto(producto) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!respuesta.ok) {
    throw new Error("Error al registrar el producto.");
  }
  return await respuesta.json();
}

export async function actualizarProducto(id, producto) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!respuesta.ok) {
    throw new Error("Error al actualizar el producto.");
  }
  return await respuesta.json();
}

export async function eliminarProducto(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    throw new Error("Error al eliminar el producto.");
  }
  return await respuesta.json();
}