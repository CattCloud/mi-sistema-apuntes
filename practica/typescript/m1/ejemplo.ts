interface Producto {
  nombre: string
  precio: number
}

type Moneda = "PEN" | "USD"

function mostrarPrecio(p: Producto, moneda: Moneda = "PEN"): string {
  return `${p.nombre}: ${moneda} ${p.precio}`
}

const teclado: Producto = { nombre: "Teclado", precio: 120 }
console.log(mostrarPrecio(teclado))