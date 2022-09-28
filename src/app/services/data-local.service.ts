import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../Models/registro.model';
import { Storage } from '@ionic/storage-angular';
import { Registros } from '../interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  private _registros: Registros[] =[];

  get getLocalRegistros(){
    return[...this._registros];
  }

  constructor(private navCtrll: NavController, private storage: Storage,private iab: InAppBrowser) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadRecientes();
  }

  abrirRegistro (registro: Registro) {

    this.navCtrll.navigateForward('/tabs/tab2');
    console.log(registro);

    switch (registro.type) {
      case "http":
        //tarea abrir en navegado
        const browser = this.iab.create(registro.text);
        browser.show();

        break;
      case "geo":
          this.navCtrll.navigateForward( `/tabs/tab2/map/${registro.text} `);
        break;

      default:
        console.log(registro.text, "hola");
        break;
    }
  }

  async guardarRegistro(registro: Registro){

    const exists = this._registros.find(localRegistros => localRegistros.text === registro.text);


    this._registros = [registro, ...this._registros];
    this._storage.set('registros', this._registros);
    return this._registros;
  }

  async loadRecientes(){
    try{
      const registros = await this.storage.get('registros');
      this._registros = registros || [];

    }catch(err){
      console.log(err);
  }
}
}
