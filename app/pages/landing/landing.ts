import {Page, NavController, Loading} from 'ionic-angular';

//Custom imports
import {CategoriesListPage} from "../categories-list/categories-list";
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";
import {LookupGradesPage} from "../lookup-grades/lookup-grades";

@Page({
  templateUrl: 'build/pages/landing/landing.page.html'
})
export class LandingPage {
  public gradesPage = LookupGradesPage;
  constructor(private _nav: NavController) { }

  public goToNews() {
    this._nav.push(CategoriesListPage);
  }
}
