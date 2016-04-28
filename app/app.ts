import 'es6-shim';
import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

//Custom Imports
import {LandingPage} from './pages/landing/landing';
import {CategoriesListPage} from './pages/categories-list/categories-list';
import {CategoryNewsPage} from "./pages/category-news/category-news";

@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    public rootPage: any = LandingPage;
    public pages: Array<{ title: string, component: any }>;
    public categoriesPages: Array<{ title: string, component: any, categoryId: string }>;

    constructor(private app: IonicApp, private platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: LandingPage },
            { title: 'All News', component: CategoriesListPage }
        ];

        this.categoriesPages = [
            { title: 'Universities', component: CategoryNewsPage, categoryId: "C95NB1grX0" },
            { title: 'News', component: CategoryNewsPage, categoryId: "iXO8tgptpL" },
            { title: 'Science', component: CategoryNewsPage, categoryId: "KT5uqdDFQL" }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.push(page.component, {
            categoryName: page.title,
            categoryObjectId: page.categoryId
        });
    }
}
