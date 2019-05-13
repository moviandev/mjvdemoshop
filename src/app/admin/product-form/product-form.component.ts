import { ProductService } from '../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.categories$ = categoryService.returnAll();
// tslint:disable-next-line: prefer-const
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).take(1).subscribe(p => this.product = p); }
  }

  save(product) {
    if(this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }
  delete(){
    if (!confirm('Você tem certeza que deseja apagar esse produto?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
