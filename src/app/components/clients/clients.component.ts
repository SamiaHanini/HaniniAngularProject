import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../entities/client.entities';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  clients?: Client[];
  loading = false;

  constructor(private clientsService: ClientsService, private router: Router) {}

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
          this.clients = data;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }


  showAll() {
    this.clientsService.getAllClients().subscribe({
      next: data => {
        this.clients = data;
      }
    });
  }


  onEdit(client: Client) {
    this.router.navigateByUrl('editClient/' + client.id);
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
    this.router.navigateByUrl('newClient');
  }
}
