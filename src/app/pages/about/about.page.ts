import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform, AlertController, ToastController } from '@ionic/angular';
declare var google;
import { Geolocation, GeolocationOptions, Geoposition, PositionError} from '@ionic-native/geolocation/ngx';
import { Geofence } from '@ionic-native/geofence/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
    // tslint:disable-next-line:max-line-length
    constructor(public navCtrl: NavController, private geolocation: Geolocation, private geofence: Geofence, public toastController: ToastController,
                private platform: Platform, private localNotifications: LocalNotifications, public alertController: AlertController) {
        this.getUserPosition();
        this.platform.ready().then((rdy) => {
            this.localNotifications.on('click').subscribe(res => {
                const msg = res.data ? res.data.mydata : '';
                this.showAlert(res.title, res.text, msg);
            });
    });
    }
    visible = false;
    map;
    public  placename;
    @ViewChild('map') mapElement;
    mapSearchKey = '';
    options: GeolocationOptions;
    currentPos: Geoposition;
    private places: Array<any>;
    static loadpage() {
        console.log('hi');
    }
    addMap(lat, long) {

        const latLng = new google.maps.LatLng(lat, long);

        const mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };


        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.getRestaurants(latLng).then((results: Array<any>) => {
            this.places = results;
            for (let i = 0 ; i < results.length ; i++) {
                this.createMarker(results[i]);
                if (i === 2) {
                this.opentoast(results[i]); }
                console.log(results[i].name);
                this.localNotifications.schedule({
                    id: 1,
                    title: 'Attention',
                    text: results[i].name,
                    data: {mydata: 'my hidden msg is this'},
                    // sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
                    // data: { secret: key }
                });

                }
        }, (status) => console.log(status));

        this.addMarker();

    }
    addMarker() {

        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        const content = '<p>This is your current position !</p>';
        const infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }
   async opentoast(place) {
        const toast = await this.toastController.create({
            message: 'you are near to' + place.name,
            animated: false,
            // position: 'top',
            showCloseButton: true,
            closeButtonText: 'view',
            color: 'secondary',
        });
        toast.present();
       toast.onDidDismiss().then((val) => {
           this.loadpage(place.name);
       });
    }
    getUserPosition() {
        this.options = {
            enableHighAccuracy: false
        };
        this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

            this.currentPos = pos;

            console.log(pos);
            console.log(pos.coords);
            this.addMap(pos.coords.latitude, pos.coords.longitude);

        }, (err: PositionError) => {
            console.log('error : ' + err.message);
        });
    }

    getRestaurants(latLng) {
        const service = new google.maps.places.PlacesService(this.map);
        const request = {
            location : latLng,
            radius : 1500,
            types: ['park'],
            fields: ['name'],

        };
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(status);
                }

            });
        });

    }
    createMarker(place) {
        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location,

        });
        // const content = place.name;
        // const infoWindow = new google.maps.InfoWindow({
        //     content: content
        // });
        //
        // google.maps.event.addListener(marker, 'click', () => {
        //     // infoWindow.open(this.map, marker);
        //     infoWindow.setContent('<h4> ' + place.name + '</h4>' +
        //     '<button class="btn btn-primary" >Call</button>');
        //     infoWindow.open(this.map, marker);
        //     });
    }
    showAlert(header, sub, msg) {
        this.alertController.create({
           header: header,
           subHeader: sub,
           message: msg,
           buttons: ['ok']
        }).then(alert => alert.present());

    }

    loadpage(place) {
        this.navCtrl.navigateForward('home-results');
        // this.placename = place.name;
    }
    logout() {
        this.navCtrl.navigateForward('');
    }
    // async openToast() {
    //     const toast = await this.toastController.create({
    //
    //     });
    // }
    addvtisement() {
        this.navCtrl.navigateForward('advertisement');
    }

    gmap() {
        this.navCtrl.navigateForward('about');
    }
}
