import { Component, Input } from '@angular/core';
import { Registros } from 'src/app/interfaces';
import { Registro } from 'src/app/Models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  get registros(): Registros[]{
    return this.dataLocalService.getLocalRegistros;
  }

  constructor(private dataLocalService:DataLocalService) {}

  abrirRegistro(param1, param2 ){
    const registro: Registro = new Registro(param1,param2);
    this.dataLocalService.abrirRegistro(registro);
    this.dataLocalService.guardarRegistro(registro);
  }

}
