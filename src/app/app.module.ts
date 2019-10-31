import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Geofence} from '@ionic-native/geofence/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
// Modal Pages
// Components
import {NotificationsComponent} from './components/notifications/notifications.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import firebaseConfig from './firebase';

import {FCM} from '@ionic-native/fcm/ngx';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AdvertisementService} from './pages/advertisement.service';
import {AboutPage} from './pages/about/about.page';
import {AdvertisementPage} from './pages/advertisement/advertisement.page';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';
import {HomeResultsPage} from './pages/home-results/home-results.page';
import {LoginPage} from './pages/login/login.page';
import {SearchFilterPage} from './pages/modal/search-filter/search-filter.page';
import {RegisterPage} from './pages/register/register.page';
import {ImagePage} from './pages/modal/image/image.page';
import {PopmenuComponent} from './components/popmenu/popmenu.component';
import {SettingsPage} from './pages/settings/settings.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        NotificationsComponent,
        AboutPage,
        AdvertisementPage,
        EditProfilePage,
        HomeResultsPage,
        LoginPage,
        SearchFilterPage,
        RegisterPage,
        ImagePage,
        PopmenuComponent,
        SettingsPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot({mode: 'ios'}),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,

    ],
    entryComponents: [NotificationsComponent],
    providers: [
        StatusBar,
        SplashScreen,
        TextToSpeech,
        Geolocation,
        Geofence,
        OneSignal,
        AdvertisementService,
        LocalNotifications,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
