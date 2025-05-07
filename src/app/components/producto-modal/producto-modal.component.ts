import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Producto } from "../../models/producto.interface"
import  { PrecioService } from "../../services/precio.service"

@Component({
  selector: "app-producto-modal",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="visible" (click)="cerrarModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ producto?.nombre }}</h2>
          <button class="btn-cerrar" (click)="cerrarModal($event)">×</button>
        </div>
        <div class="modal-body">
          <div class="producto-imagen">
            <img [src]="producto?.imagen" [alt]="producto?.nombre">
          </div>
          <div class="producto-detalles">
            <p class="precio">{{ precioFormateado }}</p>
            <p class="descripcion">{{ producto?.descripcion }}</p>
            <p class="categoria">Categoría: {{ producto?.categoria }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cerrar-texto" (click)="cerrarModal($event)">Cerrar</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .btn-cerrar {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }
    
    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    @media (min-width: 768px) {
      .modal-body {
        flex-direction: row;
      }
    }
    
    .producto-imagen {
      flex: 1;
    }
    
    .producto-imagen img {
      width: 100%;
      border-radius: 4px;
    }
    
    .producto-detalles {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .precio {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2a6496;
      margin: 0;
    }
    
    .descripcion {
      line-height: 1.6;
      color: #333;
    }
    
    .categoria {
      color: #666;
      font-style: italic;
    }
    
    .modal-footer {
      padding: 15px 20px;
      border-top: 1px solid #eee;
      text-align: right;
    }
    
    .btn-cerrar-texto {
      background-color: #2a6496;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  `,
  ],
})
export class ProductoModalComponent {
  @Input() producto: Producto | null = null
  @Input() visible = false
  @Output() cerrar = new EventEmitter<void>()

  constructor(private precioService: PrecioService) {}

  get precioFormateado(): string {
    return this.producto ? this.precioService.formatearPrecio(this.producto.precio) : ""
  }

  cerrarModal(event: Event): void {
    event.preventDefault()
    this.cerrar.emit()
  }
}
