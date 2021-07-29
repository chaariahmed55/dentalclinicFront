import { AddEditBoncommandeComponent } from './add-edit-boncommande/add-edit-boncommande.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListBoncommandeComponent } from './list-boncommande/list-boncommande.component';
import { ListAddEditEquipementComponent } from './list-add-edit-equipement/list-add-edit-equipement.component';

const routes:Routes = [
{path:"boncommandeedit", component: AddEditBoncommandeComponent, data: {title:"Nouveau Bon de Commande"}},
{path:"boncommandeedit/:nb", component: AddEditBoncommandeComponent, data: {title:"Nouveau Bon de Commande"}},
{path:"boncommande", component: ListBoncommandeComponent, data: {title:"Bon des Commandes"}},
{path:"equipement", component: ListAddEditEquipementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
