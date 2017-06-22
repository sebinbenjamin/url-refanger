import { Component, ViewChild, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  defangedURL: string = '';
  originalURL: string = '';
  isCopied: boolean = false;
  constructor(public navCtrl: NavController) {

  }
  @HostListener('document:keydown', ['$event'])
  keydown(event: KeyboardEvent){
    if(event.keyCode == 13){
      this.openURL();
    }
  }
  @ViewChild('focusInput') myInput ;

  magic(event) {
    console.log('defanged URL: ' + this.defangedURL);
    this.originalURL = this.defangedURL
      .replace(/[^a-zA-Z0-9?=+&-\/:._\[\]]/g, '')
      .replace(/BLOCKED/g, '')
      .replace(/https:\/\//g,'')
      .replace(/http:\/\//g,'')
      .replace(/\[.\]/g, '.');
    console.log('Original URL :' + this.originalURL);
  }
  openURL(){
    console.log('Opened: ' + this.originalURL);
    window.open("http://" + this.originalURL);
  }
  copySuccess(){
    this.isCopied = true;
    console.log('copy clicked');
     setTimeout(function(){ 
        this.isCopied = false;
        console.log('called false');
        },3000);
  }
}

https://w3c.github.io/clipboard-apis/