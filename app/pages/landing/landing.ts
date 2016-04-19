import {Page} from 'ionic-angular';

//Custom imports
import {CategoriesListPage} from "../categories-list/categories-list";
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";

@Page({
    templateUrl: 'build/pages/landing/landing.page.html'
})
export class LandingPage {
    public categoriesPage = CategoriesListPage;
    public categoryNewsPage = CategoryNewsPage;
    public newsDetailsPage = NewsDetailsPage;
    constructor() {}
}
