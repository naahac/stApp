import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chat} from "../../models/Chat";
import {ChatPage} from "../chat/chat";
import {ServiceProvider} from "../../providers/service/service";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the ChatListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  chatrooms : Chat[];
  ownerId : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app : App,private storage : StorageProvider,private service : ServiceProvider) {
    this.getChats();
    this.storage.getUserId().then((userId) => {
      this.ownerId = userId;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatListPage');
  }

  getChats(){
    this.storage.getToken().then((token) => {
      this.service.getChatroomsByToken(token).subscribe((response) => {
          console.log("got chatrooms");
          this.chatrooms = response;
      });
    });

  }

  openChat(chat : Chat){
      this.app.getRootNav().push(ChatPage,{chat:chat});
  }

}
