import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as io from "socket.io-client";
import {ServiceProvider} from "../../providers/service/service";
import {StorageProvider} from "../../providers/storage/storage";
import {Chat} from "../../models/Chat";

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

class Message{

  message : string;
  userId : number;

  constructor(message : string, userId : number){
    this.message = message;
    this.userId = userId;
  }

}

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  socket : SocketIOClient.Socket;
  receiverUserId : number;
  senderUserId : number;
  chatId : number;
  message : string;
  messages : Message[];
  chat : Chat;
  ownerId : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service : ServiceProvider, private storage : StorageProvider) {
    this.messages = [];
    this.receiverUserId = navParams.get("userId");
    this.chat = navParams.get("chat");
    if(this.receiverUserId === undefined){
      storage.getUserId().then(ownerId => {
        this.ownerId = ownerId;
        if(ownerId === this.chat.user1){
          this.receiverUserId = this.chat.user2;
        }else{
          this.receiverUserId = this.chat.user1
        }
      });
    }
    this.socket = io.connect(this.service.getBaseUrl());
    this.socket.on("messageToClient", (message, chatId) =>{
      if(chatId === this.chatId){
        this.messages.push(new Message(message, this.receiverUserId));
        let temp = this.messages;
        this.messages = temp;
      }
      console.log("message recived: " + message + ";chatId:" + chatId);
    });
    this.connectToChat();
    this.storage.getToken().then((token) =>{
      console.log("chat userId: " + this.receiverUserId);
      this.service.createChatroom(token, this.receiverUserId).subscribe((response) =>{
        this.chatId = response.data;
        this.service.getChatById(token, this.chatId).subscribe((response) => {
          let obj = response.data;
          this.chat = new Chat(obj['chatId'],obj['user1'], obj['user2'], obj['username1'], obj['username2'])
          for (let msg of obj['message']) {
            let newMessage = new Message(msg['message'], msg['userId']);
            this.messages.push(newMessage);
          }
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  connectToChat(){
    this.storage.getUserId().then((userId) => {
      this.senderUserId = userId;
      this.socket.emit("subscribe", userId, function(respMsg, username){
        console.log("response");
      });
    });
  }

  sendMessage(data) {
    // let reference = this;
    console.log("trying to send: " + data);
    this.socket.emit("messageToServer", this.chatId, this.senderUserId, this.receiverUserId, this.message, function(respMsg, username){
      console.log("message resp");
    });
    this.messages.push(new Message(this.message, this.ownerId));
    this.message = "";
  }
}
