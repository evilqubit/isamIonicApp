import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

//Custom imports
import {CategoriesListPage} from "../categories-list/categories-list";
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";

@Page({
  templateUrl: 'build/pages/landing/landing.page.html'
})
export class LandingPage {
}
