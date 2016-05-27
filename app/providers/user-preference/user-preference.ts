import { Storage, LocalStorage } from 'ionic-angular';
import {Injectable} from 'angular2/core';

/*
  Generated class for the UserPreference provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserPreference {
  public selectedLanguage: { name: string, id: string } = null;
  private localStorage: Storage = new Storage(LocalStorage);

  constructor() {
    this.localStorage.getJson("language").then((languageObj) => {
      console.log(languageObj);
      if (languageObj === null) {
        this.setLanguageById();
        return false;
      }
      this.setLanguageById(languageObj.id);
    }).catch((e) => {
      console.log(e);
    });
  }

  public setLanguageById(languageId?) {
    console.log(languageId);
    switch (languageId) {
      case "1":
        this.selectedLanguage = {
          name: "EN",
          id: "1"
        };
        break;
      case "2":
        console.log("frenc");
        this.selectedLanguage = {
          name: "FR",
          id: "2"
        };
        break;
      case "3":
        this.selectedLanguage = {
          name: "AR",
          id: "3"
        };
        break;
      default:
        this.selectedLanguage = {
          name: "EN",
          id: "1"
        };
    }

    console.log(this.selectedLanguage);
    window.localStorage.removeItem("language");
    this.localStorage.setJson("language", this.selectedLanguage)
    // this.localStorage.set("language", JSON.stringify(this.selectedLanguage));
  }

  public getSelectedLanguage(): { name: string, id: string } {
    return this.selectedLanguage;
  }
}

