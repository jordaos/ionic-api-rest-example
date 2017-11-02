import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UsersProvider } from './../../providers/users/users';
import { UserLogin } from './../../entity/user-login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    model: UserLogin;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toast: ToastController,
        private userProvider: UsersProvider) {
        this.model = new UserLogin();
        this.model.email = 'sydney@fife';
        this.model.password = 'pistol';
    }

    ionViewDidLoad() { }

    login() {
        this.userProvider.login(this.model.email, this.model.password)
            .then((result: any) => {
                this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();

                //Salvar o token no Ionic Storage para usar em futuras requisições.
                //Redirecionar o usuario para outra tela usando o navCtrl
                //this.navCtrl.pop();
                //this.navCtrl.setRoot()
            })
            .catch((error: any) => {
                this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }
}
