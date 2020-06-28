import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GoPageComponent} from './go-page/go-page.component';
import {RecentlyAddedPageComponent} from './recently-added-page/recently-added-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/add', pathMatch: 'full'},
  {path: 'add', component: RecentlyAddedPageComponent},
  {path: 'go', component: GoPageComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
