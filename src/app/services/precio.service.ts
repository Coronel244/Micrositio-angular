import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class PrecioService {
  constructor() {}

  /**
   * Formatea un número como precio en formato $XX.XX
   * @param valor El número a formatear
   * @returns String formateado como precio
   */
  formatearPrecio(valor: number): string {
    // Formatea el número con 2 decimales y prefijo $
    return `$${Math.abs(valor).toFixed(2)}`
  }
}
