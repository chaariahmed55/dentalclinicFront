export class MBoncommande{
  nboncommande: number;
  dateboncommande: Date;
  cfournisseur: string;
  raisonsocialefournisseur: string;
  montant: number = 0;
  etat:string= "EN ATTENTE";
  bvalid:boolean= false;
}
