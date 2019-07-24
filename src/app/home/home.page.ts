import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  httpsColor: string;
  copyColor: string;
  defangedURL = '';
  originalURL = '';
  httpsEnabled: boolean;

  @ViewChild('focusInput') myInput: ElementRef;
  constructor() {
    this.copyColor = 'primary';
    this.httpsColor = 'tertiary';
    this.httpsEnabled = true;
  }

  @HostListener('document:keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.openURL();
    }
  }

  magic(event) {
    console.log('defanged URL: ' + this.defangedURL);
    this.originalURL = this.defangedURL
      .replace(/[^a-zA-Z0-9#?=+&-\/:._%{}\[\]]/g, '')
      .replace(/BLOCKED/g, '')
      .replace(/https:\/\//g, '')
      .replace(/http:\/\//g, '')
      .replace(/\[.\]/g, '.');
    console.log('Original URL :' + this.originalURL);
  }

  openURL() {
    console.log('Opened: ' + this.originalURL);
    console.log(this.originalURL.length);
    if (this.originalURL.length > 0) {
      if (this.httpsEnabled) {
        window.open('https://' + this.originalURL);
      } else {
        window.open('http://' + this.originalURL);
      }
    } else {
      alert('Please enter the URL !');
    }
  }

  copySuccess() {
    // copies data to clipboard
    const textField = document.createElement('textarea');

    if (this.httpsEnabled) {
      textField.innerText = 'https://' + this.originalURL;
    } else {
      textField.innerText = 'http://' + this.originalURL;
    }

    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    // changes color of copy button
    this.copyColor = 'light';
    setTimeout(() => {
      this.copyColor = 'primary';
    }, 1000);
  }

  toggleHttps() {
    console.log('Pre-toggle state', this.httpsEnabled);
    if (this.httpsEnabled) {
      this.httpsColor = 'light';
      this.httpsEnabled = false;
    } else {
      this.httpsEnabled = true;
      this.httpsColor = 'tertiary';
    }
    console.log('Toggled to: ', this.httpsEnabled);
  }
}
