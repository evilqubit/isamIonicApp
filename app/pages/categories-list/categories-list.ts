import {NavController, Loading, Modal} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {Component} from '@angular/core';

// Custom imports
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";
import {PartnerDetailsPage} from "../partner-details/partner-details";
import {LookupGradesPage} from "../lookup-grades/lookup-grades";
import { UserPreference } from '../../providers/user-preference/user-preference';
import { SearchPage } from '../search/search';

// Modals
import {LanguageSelectModalPage} from '../language-select-modal/language-select-modal';
// Pipes
import { Sort } from '../../pipes/sort';

@Component({
  templateUrl: 'build/pages/categories-list/categories-list.page.html',
  pipes: [Sort]
})
export class CategoriesListPage {
  // Pages used for navigation
  public categoriesPage = CategoriesListPage;
  public categoryNewsPage = CategoryNewsPage;
  public newsDetailsPage = NewsDetailsPage;
  public gradePage = LookupGradesPage;
  public searchPage = SearchPage;
  // Sliders Options
  public sliderOptions: Object;
  public adSlidesOptions: Object;
  // Sliders content
  public adSlides;
  public response;
  public partners;

  constructor(private _http: Http, private _nav: NavController, public _userPref: UserPreference) {
    this.sliderOptions = {
      slidesPerView: 3,
      freeMode: true, // boolean	false	If true then slides will not have fixed positions
      freeModeMomentum: true //	boolean	true	If true, then slide will keep moving for a while after you release it
    }

    this.adSlidesOptions = {
      autoplay: 4000,
      loop: true,
      speed: 1000
    };
  }

  public ionViewLoaded() {
    this.getCategories();
    this.getSlideAds();
    this.getPartners();
  }

  public getPartners() {
    let requestHeaders = new Headers();
    requestHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    requestHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/Partner`, {
      headers: requestHeaders
    }).map(res => res.json())
      .subscribe((data) => {
        this.partners = data.results;
      }, (error) => {
        console.log(error);
      }, () => {
      });
  }

  public showSubcategoryNews(subcategoryObject) {
    this._nav.push(CategoryNewsPage, {
      categoryObject: subcategoryObject
    });
  }

  public showPartnerDetails(selectedPartner) {
    this._nav.push(PartnerDetailsPage, {
      partnerDetails: selectedPartner
    });
  }

  public openLinkInSystem(url) {
    window.open(url, '_system');
  }

  public presentLanguageSelectModal() {
    let languageSelectModal = Modal.create(LanguageSelectModalPage);
    this._nav.present(languageSelectModal);
  }

  private getCategories() {
    let loading = Loading.create({
      content: "Loading..."
    });

    this._nav.present(loading);

    // https://api.parse.com/1/classes/Category
    let requestHeaders = new Headers();
    requestHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    requestHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");
    // where={"langId": ${this._userPref.getSelectedLanguage().id}}&
    this._http.get(`https://api.parse.com/1/classes/Category?where={
      "status": 1
      }&include=subcat,subcat.subsubcat`, {
      headers: requestHeaders
    }).map(res => res.json())
      .subscribe((data) => {
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].subcat) {
            for (let j = 0; j < data.results[i].subcat.length; j++) {
              if (data.results[i].subcat[j] === null || data.results[i].subcat[j].status === 0) {
                data.results[i].subcat.splice(j, 1);
                j = 0;
              } else {
                if (data.results[i].subcat[j].subsubcat) {
                  for (let k = 0; k < data.results[i].subcat[j].subsubcat.length; k++) {
                    if (data.results[i].subcat[j].subsubcat[k] === null) {
                      data.results[i].subcat[j].subsubcat.splice(k, 1);
                      k = 0;
                    }
                  }
                }
              }
            }
          }
        }
        this.setNameByLanguage(data);
        this.response = data.results;

      },
      error => console.log(error),
      () => {
        loading.dismiss();
      });
  }

  private getSlideAds() {
    let requestHeaders = new Headers();
    requestHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    requestHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/Slider`, {
      headers: requestHeaders
    }).map(res => res.json())
      .subscribe((data) => {
        this.adSlides = data.results;
      }, (error) => {
        console.log(error);
      }, () => {
      });
  }

  private setNameByLanguage(categoryData) {
    for (let i = 0; i < categoryData.results.length; i++) {
      if (this._userPref.getSelectedLanguage().name === 'FR') {
        categoryData.results[i].categoryName = categoryData.results[i].categoryNameFr;
        for (let j = 0; j < categoryData.results[i].subcat.length; j++) {
          categoryData.results[i].subcat[j].SubCatName = categoryData.results[i].subcat[j].SubCatNameFr;
        }
      } else if (this._userPref.getSelectedLanguage().name === 'AR') {
        categoryData.results[i].categoryName = categoryData.results[i].categoryNameAr;
        for (let j = 0; j < categoryData.results[i].subcat.length; j++) {
          categoryData.results[i].subcat[j].SubCatName = categoryData.results[i].subcat[j].SubCatNameAr;
        }
      }
    }
  }
}
