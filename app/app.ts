declare var parsePlugin, AdMob;

import 'es6-shim';
import {App, IonicApp, Platform, Modal} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

// Custom Imports
import {CategoriesListPage} from './pages/categories-list/categories-list';
import {LookupGradesPage} from "./pages/lookup-grades/lookup-grades";
import {SearchPage} from './pages/search/search';
import {UserPreference} from './providers/user-preference/user-preference';
import { QuizzesPage } from './pages/quizzes/quizzes';
import { CalendarPage } from './pages/calendar/calendar';
import { ResourcesPage } from './pages/resources/resources';

// Modals
import {LanguageSelectModalPage} from './pages/language-select-modal/language-select-modal';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers: [UserPreference],
  prodMode: false // TODO change to true before release
})
class MyApp {
  public rootPage: any = CategoriesListPage;
  public pages: Array<{ title: string, component: any }>;
  public categoriesPages: Array<{ title: string, component: any, categoryId: string }>;

  constructor(private app: IonicApp, private platform: Platform, public userPref: UserPreference) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: SearchPage },
      { title: 'Home', component: CategoriesListPage },
      { title: "Quizzes", component: QuizzesPage },
      { title: "Calendar", component: CalendarPage },
      { title: 'Files & Resources', component: ResourcesPage },
      { title: 'Find Grades', component: LookupGradesPage }
    ];
  }

  public initializeApp() {
    this.platform.ready().then(() => {

      this.prepareAds();

      StatusBar.styleDefault();

      // let push = Push.init({
      //   android: {
      //     senderID: "12345679"
      //   },
      //   ios: {
      //     alert: "true",
      //     badge: true,
      //     sound: 'false'
      //   },
      //   windows: {}
      // });

      // var applicationId = "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou";
      // var clientKey = "UJ3W7Vky7ziZ3JDu9b5zOaZ2GKBaBr0Mnpdi33yH";

      // push.on('registration', (data) => {
      //   console.log(data.registrationId);
      // });

      // push.on('notification', (data) => {
      //   console.log(data.message);
      //   console.log(data.title);
      //   console.log(data.count);
      //   console.log(data.sound);
      //   console.log(data.image);
      //   console.log(data.additionalData);
      // });

      // parsePlugin.initialize(applicationId, clientKey, function () {
      // }, function (e) {
      //   // alert('error');
      // });
    });

    Splashscreen.hide();
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  public presentLanguageSelectModal() {
    let nav = this.app.getComponent('nav');
    let languageSelectModal = Modal.create(LanguageSelectModalPage);
    nav.present(languageSelectModal);
  }

  public prepareAds() {

    let admobid = { // for Windows Phone
      banner: '/53923969/ISAM',
      // banner: 'ca-app-pub-6869992474017983/9375997553',
      interstitial: '/53923969/ISAM-300'
    };

    AdMob.createBanner({
      adId: admobid.banner,
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: true, // TODO: remove this line when release
      autoShow: true
    })
  }

}
