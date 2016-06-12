import {Page, NavController} from 'ionic-angular';
import {Component} from '@angular/core';

//Custom imports
import {CategoriesListPage} from "../categories-list/categories-list";
import {LookupGradesPage} from "../lookup-grades/lookup-grades";

@Component({
  templateUrl: 'build/pages/landing/landing.page.html'
})
export class LandingPage {
  public gradesPage = LookupGradesPage;
  constructor(private _nav: NavController) { }

  public goToNews() {
    this._nav.push(CategoriesListPage);
  }
}
