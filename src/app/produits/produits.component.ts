import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html'
})
export class ProduitsComponent implements OnInit {

  produits?: Produit[]; //un tableau de produits

  constructor(private produitService: ProduitService, private router: Router) {
    //this.produits=[];
  }

  ngOnInit(): void {

    //  this.produits = this.produitService.listeProduits();
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit!).subscribe(() => {
        console.log("produit supprimé");
        this.SuprimerProduitDuTableau(p);
      });
  }
  SuprimerProduitDuTableau(prod: Produit) {
    this.produits!.forEach((cur, index) => {
      if (prod.idProduit === cur.idProduit) {
        this.produits!.splice(index, 1);
      }
    });
  }


}