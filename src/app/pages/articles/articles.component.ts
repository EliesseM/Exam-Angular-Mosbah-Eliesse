import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';  
import { MatIconModule } from '@angular/material/icon';    
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  form: FormGroup;
  loading = true;  // <-- Ajouté

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      promoOnly: [false],
      maxPrice: [''],
      searchTitle: ['']
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.loading = true;  
    });
 
  
    this.form.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { promoOnly, maxPrice, searchTitle } = this.form.value;

    this.filteredProducts = this.products.filter(p => {
      let matches = true;

      if (promoOnly) matches = matches && p.discountPercent > 0;
      if (maxPrice) matches = matches && p.fullPrice <= +maxPrice;
      if (searchTitle) matches = matches && p.title.toLowerCase().includes(searchTitle.toLowerCase());

      return matches;
    });
  }

  getDiscountedPrice(product: Product): number {
    return product.fullPrice * (1 - product.discountPercent);
  }

  resetFilters(): void {
  this.form.reset({
    promoOnly: false,
    maxPrice: '',
    searchTitle: ''
  });
}

  
}
