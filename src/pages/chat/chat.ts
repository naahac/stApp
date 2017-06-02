import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as io from "socket.io-client";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  socket;
  userId : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service : ServiceProvider) {
    this.userId = navParams.get("userId");
    this.socket = io(this.service.getBaseUrl());
    this.connectToChat();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  connectToChat(){
    this.socket.emit("connect", this.userId, function(respMsg, username){
      console.log("response");
    });
  }

  sendMessage(data) {
    // let reference = this;
    this.socket.emit("messageToServer", data.value, function(respMsg, username){

    });
  }
}
