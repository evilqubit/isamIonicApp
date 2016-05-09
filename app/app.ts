import 'es6-shim';
import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

//Custom Imports
import {LandingPage} from './pages/landing/landing';
import {CategoriesListPage} from './pages/categories-list/categories-list';
import {CategoryNewsPage} from "./pages/category-news/category-news";
import {LookupGradesPage} from "./pages/lookup-grades/lookup-grades";
import {SearchPage} from './pages/search/search';

@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  public rootPage: any = CategoriesListPage;
  public pages: Array<{ title: string, component: any }>;
  public categoriesPages: Array<{ title: string, component: any, categoryId: string }>;

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: SearchPage },
      { title: 'Home', component: CategoriesListPage },
      { title: 'Find Grades', component: LookupGradesPage }
    ];

    // this.categoriesPages = [
    //     { title: 'Universities', component: CategoryNewsPage, categoryId: "C95NB1grX0" },
    //     { title: 'News', component: CategoryNewsPage, categoryId: "iXO8tgptpL" },
    //     { title: 'Science', component: CategoryNewsPage, categoryId: "KT5uqdDFQL" }
    // ];

    var applicationId = "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou";
    var clientKey = "UJ3W7Vky7ziZ3JDu9b5zOaZ2GKBaBr0Mnpdi33yH";

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      window.parsepushnotification.setUp(applicationId, clientKey);

      //registerAsPushNotificationClient callback (called after setUp)
      window.parsepushnotification.onRegisterAsPushNotificationClientSucceeded = function () {
        alert('onRegisterAsPushNotificationClientSucceeded');
      };
      window.parsepushnotification.onRegisterAsPushNotificationClientFailed = function () {
        alert('onRegisterAsPushNotificationClientFailed');
      };

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
