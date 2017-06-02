/**
 * Created by Natanael on 2. 06. 2017.
 */
export class Chat {
  chatId : number;
  user1 : number;
  user2 : number;
  userName1 : string;
  userName2 : string;

  constructor(chatId: number, user1 : number, user2 : number, username1 : string, username2 : string) {
    this.chatId = chatId;
    this.user1 = user1;
    this.user2 = user2;
    this.userName1 = username1;
    this.userName2 = username2;
  }
}
