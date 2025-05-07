import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Producto } from "../../models/producto.interface"
import { PrecioService } from "../../services/precio.service"

@Component({
  selector: "app-producto-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="producto-card" (click)="onProductoClick()">
      <div class="producto-imagen">
        <img [src]="producto.imagen" [alt]="producto.nombre">
      </div>
      <div class="producto-info">
        <h3>{{ producto.nombre }}</h3>
        <p class="precio">{{ precioFormateado }}</p>
      </div>
    </div>
  `,
  styles: [
    `
    .producto-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      background-color: white;
    }
    
    .producto-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .producto-imagen {
      height: 200px;
      overflow: hidden;
    }
    
    .producto-imagen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .producto-info {
      padding: 15px;
    }
    
    .producto-info h3 {
      margin: 0 0 10px 0;
      font-size: 1.1rem;
    }
    
    .precio {
      font-weight: bold;
      color: #2a6496;
      margin: 0;
    }
  `,
  ],
})
export class ProductoCardComponent {
  @Input() producto!: Producto
  @Output() seleccionado = new EventEmitter<Producto>()

  constructor(private precioService: PrecioService) {}

  get precioFormateado(): string {
    return this.precioService.formatearPrecio(this.producto.precio)
  }

  onProductoClick(): void {
    this.seleccionado.emit(this.producto)
  }
}
