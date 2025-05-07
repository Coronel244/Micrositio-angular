import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ProductoService } from "./services/producto.service"
import { PrecioService } from "./services/precio.service"
import { ProductoCardComponent } from "./components/producto-card/producto-card.component"
import { ProductoModalComponent } from "./components/producto-modal/producto-modal.component"
import { Producto } from "./models/producto.interface"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoCardComponent, ProductoModalComponent],
  template: `
    <div class="container">
      <header class="barra-gris">
        <h1>Productos Destacados</h1>
        <div class="filtro-container">
          <label for="categoria">Filtrar por categoría:</label>
          <select id="categoria" [(ngModel)]="categoriaSeleccionada" (change)="filtrarProductos()">
            <option value="">Todas las categorías</option>
            <option *ngFor="let categoria of categorias" [value]="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
      </header>
      
      <main>
        <div class="productos-grid">
          <app-producto-card 
            *ngFor="let producto of productosFiltrados" 
            [producto]="producto"
            (seleccionado)="abrirModal($event)"
          ></app-producto-card>
        </div>
        
        <div *ngIf="productosFiltrados.length === 0" class="no-resultados">
          No se encontraron productos en esta categoría.
        </div>
      </main>
      
      <app-producto-modal
        [producto]="productoSeleccionado"
        [visible]="modalVisible"
        (cerrar)="cerrarModal()"
      ></app-producto-modal>

      <footer class="barra-gris">
        <p>© 2025 Ferretería - Prueba Técnica</p>
      </footer>
    </div>
  `,
  styles: [
    `
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    header,
    footer {
      background-color: #f0f0f0;
      padding: 20px 0;
      text-align: center;
    }
    
    header h1 {
      color: #2a6496;
      margin-bottom: 20px;
    }
    
    .filtro-container {
      margin-bottom: 20px;
    }
    
    label {
      margin-right: 10px;
      font-weight: bold;
    }
    
    select {
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 1rem;
      min-width: 200px;
    }
    
    .productos-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    @media (min-width: 768px) {
      .productos-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .productos-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (min-width: 1200px) {
      .productos-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .no-resultados {
      text-align: center;
      padding: 40px;
      font-size: 1.2rem;
      color: #666;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    footer {
      font-size: 1rem;
      color: #666;
    }
  `
  ]
})
export class AppComponent implements OnInit {
  productos: Producto[] = []
  productosFiltrados: Producto[] = []
  categorias: string[] = []
  categoriaSeleccionada = ""
  productoSeleccionado: Producto | null = null
  modalVisible = false

  constructor(
    private productoService: ProductoService,
    private precioService: PrecioService,
  ) {}

  ngOnInit(): void {
    // Cargar productos
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos
      this.productosFiltrados = [...productos]
    })

    // Cargar categorías
    this.productoService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias
    })
  }

  filtrarProductos(): void {
    if (!this.categoriaSeleccionada) {
      this.productosFiltrados = [...this.productos]
    } else {
      this.productosFiltrados = this.productos.filter((producto) => producto.categoria === this.categoriaSeleccionada)
    }
  }

  abrirModal(producto: Producto): void {
    this.productoSeleccionado = producto
    this.modalVisible = true
  }

  cerrarModal(): void {
    this.modalVisible = false
    this.productoSeleccionado = null
  }
}
