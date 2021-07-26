import { ApiService } from './api.service';
import { MBonCommandeDetail } from '../Model/boncommandedetail';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MBoncommande } from '../Model/boncommande';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PDFService {

  pdfMake: any;
  mboncommandedetail: MBonCommandeDetail[] = [];
  mboncommande: MBoncommande = new MBoncommande();
  constructor(private apiservice: ApiService,) { }

  private async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  doPrint(mb: MBoncommande){
    this.mboncommande = mb;
    this.loadBoncommande();
  }

  private loadBoncommande(){
    if(this.mboncommande){
      this.apiservice.getRequest('boncommandedetail/fetchby/'+this.mboncommande.nboncommande)
        .subscribe( result => {
          if(result.STATUS === "OK"){

            if(result.DATA){
              this.mboncommandedetail = result.DATA;
              this.generatePdf();
            }
          }
          else{
            console.log(result.MESSAGE);
          }

          }, err => console.log(err)
        );
    }
  }

  private async generatePdf() {

    await this.loadPdfMaker();

    const def = {
      info: {
        title: this.mboncommande.nboncommande +' | '+this.mboncommande.raisonsocialefournisseur,
        author: 'Aymen JELJLI',
        subject: 'Bon de Commande',
      },
      content: [
        {
          text: 'Bon de Commande',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 40]
        },
        {
          columns: [
            [
              {
                columns: [
                  [
                    {
                      text:"N° BonCommande :",
                      style:"subtitle"
                    },
                    {
                      text:"Date BonCommande :",
                      style:"subtitle"
                    },
                    {
                      text:"C. Fournisseur :",
                      style:"subtitle"
                    },
                    {
                      text:"Fournisseur :",
                      style:"subtitle"
                    },
                  ],
                  [
                    {
                      text: this.mboncommande.nboncommande,
                      style:"subtitletext"
                    },
                    {
                      text: this.mboncommande.dateboncommande,
                      style:"subtitletext"
                    },
                    {
                      text: this.mboncommande.cfournisseur,
                      style: "subtitletext"
                    },
                    {
                      text: this.mboncommande.raisonsocialefournisseur,
                      style: "subtitletext"
                    },
                  ]
                ]
              }
            ],[
              {
                text:''
              }
            ]

          ],
          margin: [0, 10, 0, 40],
        },
        {
          table: {
            widths: ['*', '*', '*', '*','*'],
            body: [
              [
              {
                text: 'N°',
                style: 'tableHeader'
              },
              {
                text: 'C. Equipement',
                style: 'tableHeader'
              },
              {
                text: 'Equipement',
                style: 'tableHeader'
              },
              {
                text: 'Qte',
                style: 'tableHeader'
              },
              {
                text: 'Prix',
                style: 'tableHeader'
              },
              ],
              ...this.mboncommandedetail.map(d => {
                return [d.ordre , d.cequipement, d.libequipement, d.quantite, d.prix];
              })
            ]
          }
        },
        {
          text: "Montant",
          style: "mont"
        },
        {
          text:this.mboncommande.montant,
          alignment: 'right',
          fontSize: 12,
          bold: true
        }
      ],
      footer: {
        columns: [
          '',
          {
            text: new Date().toLocaleDateString(),
            alignment: 'right',
            margin: [0, 0, 10, 0],
          }
        ]
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        subtitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 0],
        },
        subtitletext: {
          fontSize: 12,
          margin: [0, 5, 0, 0],
        },
        tableHeader: {
          bold: true,
          margin: [3, 6, 3, 6]
        },
        mont: {
          margin: [0, 10, 0, 10],
          alignment: 'right',
          fontSize: 12,
        },
      }
    };
    this.pdfMake.createPdf(def).open();
  }

}
