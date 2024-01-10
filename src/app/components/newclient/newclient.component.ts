import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { Client } from '../../entities/client.entities';

@Component({
  selector: 'app-newclient',
  templateUrl: './newclient.component.html',
})

export class NewClientComponent implements OnInit {

  @Output() addedClient = new EventEmitter<Client>();
  clientFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]],
    });
  }

  onSaveClient(): void {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) { return; }
    this.clientsService.saveClient(this.clientFormGroup?.value).subscribe(
      data => {
        this.addedClient.emit(data);
        alert('Sauvegarde réussie');
        this.router.navigateByUrl('/clients');
      }
    );

    this.clientFormGroup?.reset();
  }
}
