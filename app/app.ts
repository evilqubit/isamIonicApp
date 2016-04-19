import 'es6-shim';
import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LandingPage} from './pages/landing/landing';
import {CategoriesListPage} from './pages/categories-list/categories-list';


@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    public rootPage: any = LandingPage;
    public pages: Array<{ title: string, component: any }>;
    public categoriesPages: Array<{ title: string, component: any }>;

    constructor(private app: IonicApp, private platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: LandingPage },
        ];

        this.categoriesPages = [
            { title: 'Science', component: CategoriesListPage },
            { title: 'Technology', component: LandingPage },
            { title: 'Arts', component: LandingPage },
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
        nav.setRoot(page.component);
    }
}
