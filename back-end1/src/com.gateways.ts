import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ReadlineParser, SerialPort } from 'serialport';
import { Chariot } from './chariot/entities/chariot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './commande/entities/commande.entity';
import { ChariotService } from './chariot/chariot.service';

const port = new SerialPort({
  path: '/dev/ttyACM0',

  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
  try {
    const json = data;
    console.log(json);
  } catch (err) {
    console.error(err);
  }
});
//
//port.write('cool');
//parser.write('cool');
/* FIN code connection port serial esp32 */

@WebSocketGateway({ cors: true })
@Injectable()
export class ComGateway {
  @WebSocketServer()
  public server: Server;
  constructor(
    @InjectRepository(Chariot) private chariot: Repository<Chariot>,
    // private readonly chariotService: ChariotService,
    @InjectRepository(Commande) private commande: any,
  ) {
    parser.on('data', (data) => {
      // this.server.emit('data', data);
      this.rechercherCommandeParReferenceChariot(data);
    });
  }

  private async rechercherCommandeParReferenceChariot(
    referenceChariot: string,
  ): Promise<void> {
    try {
      const chariot = await this.chariot.findOne({
        where: { rfid: referenceChariot },
      });

      if (!chariot) {
        console.log('Chariot introuvable');
        this.server.emit('introuvable', 1);
        port.write('0');
        return;
      }

      //const commande = await this.commande.find({ relations: ['chariot'] });
      const commande = await this.commande.find({
        where: { chariot: chariot },
        relations: ['chariot'],
      });

      if (commande.length == 0) {
        console.log('La commande nexiste pas');
        this.server.emit('introuvable', 2);
        port.write('0');
        return;
      }
      let cpt = commande.length;
      commande.forEach((element) => {
        cpt--;
        if (element && element.etat == true) {
          //console.log('Chariot trouvé :', chariot);
          console.log('Chariot trouvé :', element.id);
          const donnee = { id: element.id, montant: element.montant };
          this.server.emit('data', donnee);
          port.write('1');
          cpt = 1;
          return;
          // Effectuez d'autres opérations avec les informations du chariot
        }
      });
      console.log(cpt);
      if (cpt == 0) {
        this.server.emit('introuvable', 3);
        port.write('0');
        return;
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }

  /*
  private async rechercherCommandeParChariot(chariotId: number): Promise<void> {
    try {
      const chariot = await this.chariot.findOne(chariotId);
  
      if (!chariot) {
        console.log('Chariot introuvable');
        return;
      }
  
      const commande = await this.commande.findOne({
        where: { chariot: chariot },
      });
  
      if (!commande) {
        console.log('Aucune commande associée au chariot');
        return;
      }
  
      console.log('Commande trouvée :', commande);
      // Effectuez d'autres opérations avec la commande trouvée
  
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }
  */

  /*private async rechercherCommandeParChariot(chariotId: number): Promise<void> {
    try {
      const chariot = await this.chariot.findOne(chariotId, { relations: ['commande'] });
  
      if (!chariot) {
        console.log('Chariot introuvable');
        return;
      }
  
      const commande = chariot.commande;
  
      if (!commande) {
        console.log('Aucune commande associée au chariot');
        return;
      }
  
      console.log('Commande trouvée :', commande);
      // Effectuez d'autres opérations avec la commande trouvée
  
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  }*/

  /* private async checkTables(reference: number): Promise<void> {
    const result1 = await this.chariot.findOneBy({ reference });

    if (!result1) {
      this.server.emit('data', 'chariot inconnue');
      console.log('chariot inconnue');
    } else {
      const chariot = 5;
      console.log(result1.id);
      const result2 = await this.commande.findOne(chariotId, { relations: ['chariot'] });
      //  const result2 = await this.etudiant.findOne({ where: { matricule } });

      // Effectuez des opérations supplémentaires en fonction des résultats obtenus
      if (!result2) {
        console.log('commande innexistante');
      }
      if (result2 && result2.etat == true) {
        this.server.emit('data', 'Compte archivé');
        console.log(result1);
        console.log(result2);
      } else {
        console.log('commande deja valider');
      }
    }
  }*/
}

//console.log(data);
