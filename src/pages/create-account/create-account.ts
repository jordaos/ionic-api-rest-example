import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UsersProvider } from './../../providers/users/users'

import { UserLogin } from './../../entity/user-login'

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-create-account',
    templateUrl: 'create-account.html',
})
export class CreateAccountPage {
    model: UserLogin;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private userProvider: UsersProvider) {
        this.model = new UserLogin();
        this.model.email = "jordo05@hotmail.com";
        this.model.password = "12345678";
    }

    ionViewDidLoad() { }

    createAccount() {
        this.userProvider.createAccount(this.model.email, this.model.password)
            .then((result: any) => {
                this.toast.create({ message: 'Usuário criado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();

                //Salvar o token no Ionic Storage para usar em futuras requisições.
                //Redirecionar o usuario para outra tela usando o navCtrl
                //this.navCtrl.pop();
                //this.navCtrl.setRoot()
            })
            .catch((error: any) => {
                this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }
}
