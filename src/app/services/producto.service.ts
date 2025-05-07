import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, map } from "rxjs"
import { Producto } from "../models/producto.interface"

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de productos desde el archivo JSON
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<{ productos: Producto[] }>("assets/productos.json").pipe(
      map(response => response.productos)
    );
  }

  /**
   * Obtiene las categorías únicas de los productos
   */
  getCategorias(): Observable<string[]> {
    return this.getProductos().pipe(
      map((productos) => {
        const categorias = [...new Set(productos.map((p) => p.categoria))];
        return categorias;
      })
    );
  }
}
