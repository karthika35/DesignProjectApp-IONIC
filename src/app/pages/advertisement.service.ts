import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Add} from './model/add';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
    addList: AngularFireList<any>;

    constructor( private firedb: AngularFireDatabase, private fbstorge: AngularFireStorage  ) { }
    getAdd() {
        this.addList = this.firedb.list('adds');
        return this.addList.snapshotChanges();
    }
}
