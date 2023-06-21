import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {

  endereco = {
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };

  public enderecos: any[] = [];

  constructor(public alerta: AlertController,
    public nav: NavController,
    public servicos: EnderecosService) {}
  
  ngOnInit(): void {
    
  }

  ionViewDidEnter() {
    this.carregadados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇÃO!',
      message: 'Deseja adicionar um novo endereço',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.navigateBack('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  editar(){
    this.nav.navigateRoot('/');
  }
  carregadados(){

    // this.endereco.endereco = localStorage.getItem('endereco')!;
    // this.endereco.numero = localStorage.getItem('numero')!;
    // this.endereco.complemento = localStorage.getItem('complemento')!;
    // this.endereco.bairro = localStorage.getItem('bairro')!;
    // this.endereco.cep = localStorage.getItem('cep')!;
    // this.endereco.cidade = localStorage.getItem('cidade')!;
    // this.endereco.estado = localStorage.getItem('estado')!;

    if(this.servicos.listar()){
      this.enderecos = this.servicos.listar()!;
    }
    
  }


  
}
