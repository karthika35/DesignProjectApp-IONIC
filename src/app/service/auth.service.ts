import { Injectable } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public getmail: string;
private router: Router;
  constructor(private navCon: NavController,
              public afauth: AngularFireAuth,
              public alert: AlertController,
              public navCtrl: NavController) {
    afauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.navCon.navigateRoot('./home-results');
        this.getmail = user.email;
      } else {
        this.navCon.navigateRoot('');
      }
      // console.log(this.getmail);
    });
  }
  async login(email: string, password: string) {
    await this.afauth.auth.signInWithEmailAndPassword( email, password).then((success) => {
      console.log(success);
      // this.showAlert('success', 'Login success');
      this.navCtrl.navigateForward('home-results');


    }).catch((error) => {
      console.log(error);
      this.showAlert('error', error.message);

    });

  }
  // async logout() {
  //   this.router.navigate(['./login']);
  // }
  // public getemail() {
  //   this.getmail =
  // }
  async signup( email: string, password: string, cpassword: string) {
    await this.afauth.auth.createUserWithEmailAndPassword( email, password).then((success) => {
      console.log('success');
      this.showAlert('success', 'Registration success');

    }).catch((error) => {
      console.log(error);
      this.showAlert('error', error.message);

    });
    if ( password !== cpassword) {
      this.showAlert('error', 'password not match');
      return console.error('password is not matched');
    }
  }
  async showAlert( header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['ok']
    });
    await alert.present();
  }}
