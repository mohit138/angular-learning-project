import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './app.product';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {

  constructor() { }

  createDb() {
    const products = [
      {
        id:1,
        name: "Original - Fine Grind",
        flavour: "original",
        grind: "fine",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 20
      },
      {
        id:2,
        name: "Hazelnut - Fine Grind",
        flavour: "hazelnut",
        grind: "fine",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 22
      },
      {
        id:3,
        name: "Caramel - Fine Grind",
        flavour: "caramel",
        grind: "fine",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 23
      },
      {
        id:4,
        name: "Vanilla - Fine Grind",
        flavour: "vanilla",
        grind: "fine",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 24
      },
      {
        id:5,
        name: "Original - Medium Grind",
        flavour: "original",
        grind: "medium",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 20
      },
      {
        id:6,
        name: "Hazelnut - Medium Grind",
        flavour: "hazelnut",
        grind: "medium",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 22
      },
      {
        id:7,
        name: "Caramel - Medium Grind",
        flavour: "caramel",
        grind: "medium",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 23
      },
      {
        id:8,
        name: "Vanilla - Medium Grind",
        flavour: "vanilla",
        grind: "medium",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 24
      },
      {
        id:9,
        name: "Original - Coarse Grind",
        flavour: "original",
        grind: "coarse",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 20
      },
      {
        id:10,
        name: "Hazelnut - Coarse Grind",
        flavour: "hazelnut",
        grind: "coarse",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 22
      },
      {
        id:11,
        name: "Caramel - Coarse Grind",
        flavour: "caramel",
        grind: "coarse",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 23
      },
      {
        id:12,
        name: "Vanilla - Coarse Grind",
        flavour: "vanilla",
        grind: "coarse",
        type: "arabiata",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        price: 24
      }
  
    ];

    const flavours = [
      "original",
      "hazelnut",
      "caramel",
      "vanilla"
    ];

    const grinds = [
      "fine",
      "medium",
      "coarse"
    ];

    return {products,flavours,grinds};
  }

  genId(products: Product[]): number {
    return HttpErrorResponse.length >0 ? Math.max(...products.map(hero => hero.id)) + 1 : 11;
  }
}
