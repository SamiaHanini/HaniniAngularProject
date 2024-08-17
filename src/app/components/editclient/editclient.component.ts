import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
})
export class EditClientComponent implements OnInit {
  clientFormGroup?: FormGroup;
  idclient: number
  submitted = false;

  constructor(private fb: FormBuilder, private clientsService: ClientsService,  private route: ActivatedRoute, private router: Router) { 
    this.idclient = route.snapshot.params.id;
  }

  ngOnInit(): void {
  
    this.clientsService.getClient(this.idclient).subscribe(client => {
      this.clientFormGroup = this.fb.group({
        idclient: [client.idclient],
        mail: [client.mail, [Validators.required, Validators.email]],
        nom: [client.nom, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        prenom: [client.prenom, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        tel: [client.tel, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]],
      });
    }, error => {
      console.error('Error fetching client details:', error);
    });
  }
  

  onUpdateClient(): void {
    this.submitted = true;
    if (this.clientFormGroup?.invalid) { return; }

    this.clientsService.updateClient(this.clientFormGroup?.value).subscribe(
      data => {
        alert('Mise à jour réussie');
        this.router.navigate(['/clients']);
      },
      err => {
        alert(err.headers.get('error'));
      }
    );
  }
}
