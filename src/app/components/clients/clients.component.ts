import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../entities/client.entities';
import { ClientsService } from '../../services/clients.service';
import { TaxisService } from '../../services/taxis.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  clients?: Client[];
  loading = false;
  idtaxi: number;
  selectedClientId?: number;

  
  constructor(private clientsService: ClientsService, private router: Router, private activeroute: ActivatedRoute, private taxisService: TaxisService) {
    this.idtaxi = this.activeroute.snapshot.params.taxiId;
      if (this.idtaxi) {
        this.loading = true;
        this.taxisService.getClientsForTaxi(this.idtaxi).subscribe({
          next: data => {
            this.clients = data;
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
  }

  ngOnInit(): void {
  }

  onSearch(value: { id: number }) {
    this.clientsService.getClient(value.id).subscribe({
      next: data => {
        this.clients = data ? [data] : [];
      }
    });
  }

    getClientByNomAndPrenomAndTel(value: { nom: string, prenom: string, tel: string }) {
      this.loading = true;

      this.clientsService.getClientByNomAndPrenomAndTel(value.nom, value.prenom, value.tel).subscribe({
        next: data => {
          this.clients = data ? [data] : [];
        },
        complete: () => {
          this.loading = false;
        }
      });
    }

    getLocationsForClient(clientId: number): void {
      if (clientId) {
        this.loading = true;
        this.router.navigate(['/locations', { clientId }]); 
      }
    }


  showAll() {
    this.clientsService.getAllClients().subscribe({
      next: data => {
        this.clients = data;
      }
    });
  }


  onEdit(client: Client) {
    this.router.navigate(['/editclient', client.idclient]);
  }
  

  onDelete(client: Client) {
    const confirmation = confirm('Are you sure you want to delete?');

    if (confirmation) {
      this.clientsService.deleteClient(client).subscribe({
        next: () => {
          const index = this.clients?.indexOf(client);
          if (index !== undefined && index !== -1) {
            this.clients?.splice(index, 1);
          }
          (window as any).sendAlert('success', 'Client deleted!');
        }
      });
    }
  }

  onNewClient() {
    this.router.navigate(['newclient']);
  }
}
