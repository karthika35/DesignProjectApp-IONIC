import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

import {
    AlertController,
    IonInfiniteScroll,
    MenuController,
    ModalController,
    NavController,
    PopoverController,
    ToastController,
} from '@ionic/angular';
// Modals
import {SearchFilterPage} from '../modal/search-filter/search-filter.page';
import {ImagePage} from '../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import {NotificationsComponent} from '../../components/notifications/notifications.component';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-home-results',
    templateUrl: './home-results.page.html',
    styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
    visible = false;

    searchKey = '';
    yourLocation = '123 Test Street';
    themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
    public loginForm: FormGroup;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    public dummylist: string;
    public status = true;
    text: string;
    locale: string;
    rate: number;


    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public authsservice: AuthService,
        private tts: TextToSpeech
    ) {
        this.dummylist = 'igiriya is famous for its palace ruins on top of a massive 200 meter high rock surrounded by ' +
            // tslint:disable-next-line:max-line-length
            'the remains of an extensive network of gardens, reservoirs and other structures. The rock itself is a lava plug left over from an ancient long extinct volcano. It is also renowned for its ancient paintings (frescoes), which are similar to those found at Ajanta Caves in India. It is generally agreed, however, that the Sigiriya Frescoes exhibit a uniquely Sri Lankan style.\n' +
            '\n' +
            // tslint:disable-next-line:max-line-length
            'Sigiriya may have been inhabited through prehistoric times. It was used as a rock-shelter mountain monastery from about the 5th century BC, with caves prepared and donated by devotees of the Buddhist Sangha.\n' +
            '\n' +
            // tslint:disable-next-line:max-line-length
            'The complex surrounding the famous rock was built by King Kasyapa (477–495 CE), who had seized power from the rightful heir, Moggallana, who fled to South India. Fearing an attack from Moggallana, Kashyapa moved the capital and his residence from the traditional capital of Anuradhapura to the more secure Sigiriya. Most of the elaborate constructions on the rock summit and around it, including defensive structures, palaces, and gardens, date back to this period. Kashyapa was defeated in 495 CE by Moggallana, who moved the capital again to Anuradhapura. Sigiriya was then turned back into a Buddhist monastery, which lasted until the 13th or 14th century.\n' +
            '\n' +
            // tslint:disable-next-line:max-line-length
            'Understand also that, even though Sigiriya is maybe the most famous tourist attraction in Sri Lanka, and must have been a truly amazing place in the past, right now the ruins are only the two-brick-tall foundations of the palace walls; absolutely nothing remains standing. You are not allowed to take pictures of the frescoes, which are the most interesting part of the visit. The "mirror wall" is barely shiny in just two small spots, and apart from the ones near the beginning, the graffiti are just modern vandalization scratches on the wall.';

        this.text = 'initial text';
        this.locale = 'en-US';
        this.rate = 1;

    }

    // async getMailId(email: string, password: string) {
    //   await this.authservice.login(this.loginForm.value.email, this.loginForm.value.password); }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    settings() {
        this.navCtrl.navigateRoot('settings');
    }

    async alertLocation() {
        const changeLocation = await this.alertCtrl.create({
            header: 'Change Location',
            message: 'Type your Address.',
            inputs: [
                {
                    name: 'location',
                    placeholder: 'Enter your new Location',
                    type: 'text'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Change',
                    handler: async (data) => {
                        console.log('Change clicked', data);
                        this.yourLocation = data.location;
                        const toast = await this.toastCtrl.create({
                            message: 'Location was change successfully',
                            duration: 3000,
                            position: 'top',
                            closeButtonText: 'OK',
                            showCloseButton: true
                        });

                        toast.present();
                    }
                }
            ]
        });
        changeLocation.present();
    }

    async searchFilter() {
        const modal = await this.modalCtrl.create({
            component: SearchFilterPage
        });
        return await modal.present();
    }

    async presentImage(image: any) {
        const modal = await this.modalCtrl.create({
            component: ImagePage,
            componentProps: {value: image}
        });
        return await modal.present();
    }

    async notifications(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: NotificationsComponent,
            event: ev,
            animated: true,
            showBackdrop: true
        });
        return await popover.present();
    }

    loadData(event) {
        setTimeout(() => {
            console.log('Done');
            event.target.complete();

            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (this.dummylist.length === 1000000) {
                event.target.disabled = true;
            }
        }, 500);
    }

    logout() {
        this.navCtrl.navigateRoot('');

    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }

    // onChange() {
    //   if (this.status) {
    //     this.buttonOn();
    //   } else {
    //     this.buttonOff();
    //   }
    // }
    //
    // buttonOn() {
    //   // this function is called;
    // }
    //
    // buttonOff() {
    //   // how to call this function when toggle button gets off?
    // }
    toggle() {
        this.visible = !this.visible;
        this.tts.speak({
            text: this.text, locale: this.locale, rate: this.rate
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    addvtisement() {
        this.navCtrl.navigateForward('advertisement');
    }

    gmap() {
        this.navCtrl.navigateForward('about');
    }
}
