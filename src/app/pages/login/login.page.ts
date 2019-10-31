import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AlertController, LoadingController, MenuController, ModalController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';
import {Route} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder,
        public modelController: ModalController,
        public authService: AuthService) {
    }

    async login() {
        await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(),
            password: new FormControl()
        });

        // this.onLoginForm = this.formBuilder.group({
        //   'email': [null, Validators.compose([
        //     Validators.required
        //   ])],
        //   'password': [null, Validators.compose([
        //     Validators.required
        //   ])]
        // });
    }

    async forgotPass() {
        const alert = await this.alertCtrl.create({
            header: 'Forgot Password?',
            message: 'Enter you email address to send a reset link password.',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Confirm',
                    handler: async () => {
                        const loader = await this.loadingCtrl.create({
                            duration: 2000
                        });

                        loader.present();
                        loader.onWillDismiss().then(async l => {
                            const toast = await this.toastCtrl.create({
                                showCloseButton: true,
                                message: 'Email was sended successfully.',
                                duration: 3000,
                                position: 'bottom'
                            });

                            toast.present();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    // // //
    goToRegister() {
        this.navCtrl.navigateRoot(['/register']);
    }

    goToHome() {
        this.navCtrl.navigateRoot('/home-results');
    }

}
