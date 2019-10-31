import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from './pages/login/login.page';
import {RegisterPage} from './pages/register/register.page';
import {AboutPage} from './pages/about/about.page';
import {SettingsPage} from './pages/settings/settings.page';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';
import {HomeResultsPage} from './pages/home-results/home-results.page';
import {AdvertisementPage} from './pages/advertisement/advertisement.page';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: 'about', component: AboutPage},
    {path: 'settings', component: SettingsPage},
    {path: 'edit-profile', component: EditProfilePage},
    {path: 'home-results', component: HomeResultsPage},
    {path: 'advertisement', component: AdvertisementPage},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
