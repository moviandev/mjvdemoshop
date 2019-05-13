import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { Product } from '../modules/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  product$;
  categories$;
  category: string;

  constructor(
    productService: ProductService, 
    categoryService: CategoryService,
    route: ActivatedRoute, 
    private ShoppingCartService: ShoppingCartService) {
    this.product$ = productService.returnAll();
    this.categories$ = categoryService.returnAll();

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
    });
   }

   addToCart(product: Product){
    this.ShoppingCartService.addToCart(product);
   }


}
