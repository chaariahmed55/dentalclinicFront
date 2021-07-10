import { MBonCommandeDetail } from './boncommandedetail';
import { MBoncommande } from './boncommande';

export class BCBody{
  entete: MBoncommande;
  detail: MBonCommandeDetail[]=[];
}
