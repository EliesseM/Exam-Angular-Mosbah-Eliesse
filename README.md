README - Projet Angular CoolVent

Description
Projet Angular CoolVent présentant une application de produits de climatisation et ventilation avec une interface utilisateur moderne utilisant Angular Material.
L’utilisateur peut consulter les articles, filtrer les produits selon ses besoins, et naviguer facilement grâce à une barre de navigation stylée.

Structure du projet
src/app/pages/accueil : Page d’accueil avec une carte de bienvenue.

src/app/pages/articles : Page listant les articles avec filtres.

src/app/components/navbar : Barre de navigation stylée Angular Material.

src/app/services/product.service.ts : Service pour récupérer les données produits.

src/app/models/product.interface.ts : Interface des produits.

src/app/app.routes.ts : Configuration des routes Angular.

src/app/app.component.ts : Composant racine.

Fonctionnalités principales

1. Navigation
   Barre de navigation centrée avec Angular Material.

Liens vers Accueil et Articles avec style et indication du lien actif.

2. Page Accueil
   Carte Material avec titre, sous-titre, description.

Bouton pour accéder aux articles via Angular Router.

3. Page Articles
   Liste des produits affichée en cartes Material.

Chaque produit montre image, titre, description, prix, promo (avec badge).

Filtrage dynamique avec formulaire réactif Angular :

Recherche texte par titre.

Filtrage par prix maximum.

Filtrage par promo uniquement.

Étapes pour démarrer le projet
Lancer le serveur de développement

ng serve
Ouvrir dans le navigateur

Accéder à http://localhost:4200

Navigation

Page d’accueil visible avec navbar qui redirige vers accueil ou article

Filtrage

Utiliser les filtres pour affiner la liste des produits

Voir les badges de promotion apparaître sur les produits en promo

Code important à connaître
Routes (app.routes.ts)

export const routes: Routes = [
{ path: '', redirectTo: 'accueil', pathMatch: 'full' },
{ path: 'accueil', component: AccueilComponent },
{ path: 'articles', component: ArticlesComponent }
];

Exemple de filtre dans ArticlesComponent

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
Navbar component important

<mat-toolbar color="primary" class="navbar">

  <div class="navbar-content">
    <a mat-button routerLink="/accueil" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">Accueil</a>
    <a mat-button routerLink="/articles" routerLinkActive="active-link">Articles</a>
  </div>
</mat-toolbar>
Conseils et améliorations possibles
Ajouter un chargement visuel (spinner) lors de la récupération des produits.

Ajouter pagination sur la liste des produits.

Ajouter plus de filtres (catégorie, notes, etc.).

Ajouter un système d’authentification.

Améliorer l’accessibilité.

Ressources
Angular Documentation

Angular Material

Reactive Forms
