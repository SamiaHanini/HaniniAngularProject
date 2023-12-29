import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditClientComponent implements OnInit {
  clientFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]],
    });
  }

  onUpdateClient(): void {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) { return; }

    this.clientsService.updateClient(this.clientFormGroup?.value).subscribe(
      data => alert('Mise à jour réussie'),
      err => alert(err.headers.get('error'))
    );
  }
}
