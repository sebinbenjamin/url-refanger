import { Component, ViewChild, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  httpsColor: {
    background: string;
  };
  copyColor: {
    background: string;
  };
  defangedURL: string = '';
  originalURL: string = '';
  httpsEnabled: boolean;

  constructor(public navCtrl: NavController) {
    this.copyColor = { background: 'orange' };
    this.httpsColor = { background: 'grey' };
    this.httpsEnabled = false;
  }
  @HostListener('document:keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.openURL();
    }
  }
  @ViewChild('focusInput') myInput;

  magic(event) {
    console.log('defanged URL: ' + this.defangedURL);
    this.originalURL = this.defangedURL
      .replace(/[^a-zA-Z0-9?=+&-\/:._\[\]]/g, '')
      .replace(/BLOCKED/g, '')
      .replace(/https:\/\//g, '')
      .replace(/http:\/\//g, '')
      .replace(/\[.\]/g, '.');
    console.log('Original URL :' + this.originalURL);
  }
  openURL() {
    console.log('Opened: ' + this.originalURL);
    if (this.httpsEnabled)
      window.open("https://" + this.originalURL);
    else
      window.open("http://" + this.originalURL);
  }
  copySuccess(text) {
    //copies data to clipboard
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    //changes color of copy button
    this.copyColor.background = 'green';
    setTimeout(() => {
      this.copyColor.background = 'orange';
    }, 1000);
  }
  toggleHttps() {
    console.log(this.httpsEnabled)
    if (this.httpsEnabled) {
      this.httpsColor.background = 'grey';
      this.httpsEnabled = false;
    }
    else {
      this.httpsEnabled = true;
      this.httpsColor.background = 'green';
    }
    console.log(this.httpsEnabled)
  }
}