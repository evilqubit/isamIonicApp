import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

//Custom
// import {InAppBrowser} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/partner-details/partner-details.html',
})
export class PartnerDetailsPage {
  public partnerDetails;

  constructor(private _nav: NavController, private _navParams: NavParams) { }

  public ionViewLoaded() {
    this.partnerDetails = this._navParams.get("partnerDetails");
  }

  public openLinkInSystem(url) {
    // InAppBrowser.open(url, '_system');
    window.open(url, '_system');
  }
}
