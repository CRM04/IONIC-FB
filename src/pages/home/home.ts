import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { FmcProvider } from '../../providers/fmc/fmc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public fcm:FmcProvider , public toastCtrl:ToastController ) {

  }

  ionViewDidLoad(){

    // Get a FCM token
    this.fcm.getToken()

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
    .subscribe()
  }

}
