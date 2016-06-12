import {NavController, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';

// Custom imports
import { UserPreference } from '../../providers/user-preference/user-preference';
import { CategoriesListPage } from '../categories-list/categories-list';

@Component({
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
