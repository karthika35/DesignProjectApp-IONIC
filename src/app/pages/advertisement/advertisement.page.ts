import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AdvertisementService} from '../advertisement.service';
import {Add} from '../model/add';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.page.html',
  styleUrls: ['./advertisement.page.scss'],
})
export class AdvertisementPage {
    addSearchKey: '';
  addArray = [];


  constructor(    public navCtrl: NavController, public advertisementService: AdvertisementService) {
    this.advertisementService.getAdd().subscribe(
        list => {
          this.addArray = list.map( item => {
            return {
              $key: item.key,
              ...item.payload.val( )
            };
          });
        }
    );
    console.log(this.addArray);
  }

  goToMap() {
    this.navCtrl.navigateForward('about');

  }

  logout() {
    this.navCtrl.navigateForward('');
  }
}
