import 'es6-shim';
import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar, Push} from 'ionic-native';

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
  }

  initializeApp() {
    this.platform.ready().then(() => {
      var applicationId = "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou";
      var clientKey = "UJ3W7Vky7ziZ3JDu9b5zOaZ2GKBaBr0Mnpdi33yH";
      // // Okay, so the platform is ready and our plugins are available.
      // // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // window.parsepushnotification.setUp(applicationId, clientKey);

      // //registerAsPushNotificationClient callback (called after setUp)
      // window.parsepushnotification.onRegisterAsPushNotificationClientSucceeded = function () {
      //   alert('onRegisterAsPushNotificationClientSucceeded');
      // };
      // window.parsepushnotification.onRegisterAsPushNotificationClientFailed = function () {
      //   alert('onRegisterAsPushNotificationClientFailed');
      // };

      let push = Push.init({
        android: {
          senderID: "12345679"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });

      push.on('registration', (data) => {
        console.log(data.registrationId);
      });

      push.on('notification', (data) => {
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
      });

      parsePlugin.initialize(applicationId, clientKey, function () {

        parsePlugin.subscribe('SampleChannel', function () {

          parsePlugin.getInstallationId(function (id) {

            /**
             * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
             *
             var install_data = {
                installation_id: id,
                channels: ['SampleChannel']
             }
             *
             */

          }, function (e) {
            alert('error');
          });

        }, function (e) {
          alert('error');
        });

      }, function (e) {
        alert('error');
      });


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
