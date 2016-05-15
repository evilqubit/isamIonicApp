import {Page, NavController, NavParams} from 'ionic-angular';

//Custom
import {InAppBrowser} from 'ionic-native';

/*
  Generated class for the PartnerDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/partner-details/partner-details.html',
})
export class PartnerDetailsPage {
  public partnerDetails;

  constructor(private _nav: NavController, private _navParams: NavParams) { }

  onPageLoaded() {
    this.partnerDetails = this._navParams.get("partnerDetails");
  }

  public openLinkInSystem(url) {
    // InAppBrowser.open(url, '_system');
    window.open(url, '_system');
  }
}
