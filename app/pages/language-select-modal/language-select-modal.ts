import {Page, NavController, ViewController} from 'ionic-angular';

//Custom imports
import { UserPreference } from '../../providers/user-preference/user-preference';
import { CategoriesListPage } from '../categories-list/categories-list';

/*
  Generated class for the LanguageSelectModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/language-select-modal/language-select-modal.html',
})
export class LanguageSelectModalPage {
  public selectedLanguage;
  public languageId;
  constructor(private _nav: NavController, private _userPref: UserPreference, private _viewCtrl: ViewController) {
    this.selectedLanguage = this._userPref.getSelectedLanguage();
  }

  public dismiss(saveChanges) {
    if (saveChanges) {
      this._userPref.setLanguageById(this.languageId)
      this._viewCtrl.dismiss();
      this._nav.setRoot(CategoriesListPage);
      return true;
    }

    this._viewCtrl.dismiss();

  }
}
