import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      cpassword: new FormControl()
    });
  }
  async register() {
    await this.authService.signup(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.cpassword).then((value) => {
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    // this.onRegisterForm = this.formBuilder.group({
    //   'fullName': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'email': [null, Validators.compose([
    //     Validators.required
    //   ])],
    //   'password': [null, Validators.compose([
    //     Validators.required
    //   ])]
    // });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('');
  }
}
