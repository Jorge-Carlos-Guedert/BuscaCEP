import { Component } from '@angular/core';
import { CepService } from '../services/cep.service';
import {
  NavController,
  NumericValueAccessor,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};

  endereco = {
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };

  constructor(
    public mensagem: ToastController,
    public nav: NavController,
    private cep: CepService
  ) {}

   

  ionViewDidEnter(){
    if(localStorage.getItem('cep')){
      this.editar();
    }else{
      this.limpadados();
    }



  }
  searchCEP(evento: any) {
    const cepDig = evento.detail.value;
    if (cepDig.length == 8) {
      this.cep.localizaCEP(cepDig).subscribe(
        (resp) => {
          this.dados = resp;
          if (!this.dados || this.dados.erro) {
            this.exibeToast('CEP NÃO ENCONTRADO', 'warning');
          } else {
            this.endereco.endereco = this.dados.logradouro;
            this.endereco.bairro = this.dados.bairro;
            this.endereco.cidade = this.dados.localidade;
            this.endereco.estado = this.dados.uf;
            console.log(this.endereco);
          }
        },
        (erro) => {
          this.exibeToast('CEP NÃO ENCONTRADO', 'warning');
        }
      );
    }
  }

  cadastrar() {
    if (
      this.endereco.cidade == '' ||
      this.endereco.estado == '' ||
      this.endereco.endereco == '' ||
      this.endereco.cep == '' ||
      this.endereco.bairro == ''
    ) {
      this.exibeToast('Preencha os campos necessários', 'danger');
    } else {
      this.salvamento();
      this.nav.navigateForward('conclusao');
    }
  }

  salvamento() {
    localStorage.setItem('endereco', this.endereco.endereco);
    localStorage.setItem('numero', this.endereco.numero);
    localStorage.setItem('cep', this.endereco.cep);
    localStorage.setItem('bairro', this.endereco.bairro);
    localStorage.setItem('cidade', this.endereco.cidade);
    localStorage.setItem('estado', this.endereco.estado);
    localStorage.setItem('complemento', this.endereco.complemento);
  }

  limpadados(){

    this.endereco.endereco = '';
    this.endereco.numero = '';
    this.endereco.complemento = '';
    this.endereco.bairro = '';
    this.endereco.cep = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';

  }

  editar(){


  }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 1500,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
