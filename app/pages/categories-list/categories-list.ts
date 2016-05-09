import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

//Custom imports
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";
import {LookupGradesPage} from "../lookup-grades/lookup-grades";

@Page({
  templateUrl: 'build/pages/categories-list/categories-list.page.html'
})
export class CategoriesListPage {
  public categoriesPage = CategoriesListPage;
  public categoryNewsPage = CategoryNewsPage;
  public newsDetailsPage = NewsDetailsPage;
  public response;
  public sliderOptions: Object;
  public gradePage = LookupGradesPage;

  constructor(private _http: Http, private _nav: NavController) {
    this.sliderOptions = {
      slidesPerView: 2,
      freeMode: true, //	boolean	false	If true then slides will not have fixed positions
      // freeModeMomentum: true //	boolean	true	If true, then slide will keep moving for a while after you release it
    }
  }

  onPageLoaded() {
    this.getCategories();
  }

  private getCategories() {
    let loading = Loading.create({
      content: "Loading..."
    })

    this._nav.present(loading);

    // https://api.parse.com/1/classes/Category
    let requestHeaders = new Headers();
    requestHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    requestHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/Category?include=subcat,subcat.subsubcat`, {
      headers: requestHeaders
    }).map(res => res.json())
      .subscribe((data) => {
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].subcat) {
            for (let j = 0; j < data.results[i].subcat.length; j++) {
              if (data.results[i].subcat[j] === null) {
                data.results[i].subcat.splice(j, 1);
              }
            }
          }
        }
        this.response = data.results;
      },
      error => console.log(error),
      () => {
        loading.dismiss();
        console.log("Success");
      });
  }

  public showSubcategoryNews(subcategoryObject) {
    this._nav.push(CategoryNewsPage, {
      categoryObject: subcategoryObject
    });
  }
}
