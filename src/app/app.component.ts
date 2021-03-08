import { Component } from '@angular/core';
import {io} from 'socket.io-client';
import { Message } from './message';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GifsComponent } from './gifs/gifs.component';
import { ChatService } from './chat.service';

//const socket = io('http://localhost:3000');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [GifsComponent, ChatService]
})


export class AppComponent{
  title = 'ChatApp';
  channelName: String = 'chatOne';
  showEmojiPicker = false;

  toggleEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  showGiphyModule = false;

  toggleGiphy() {
    this.showGiphyModule = !this.showGiphyModule;
  }

  clients = [
      {user: 'Team Swapnil', avatar: './assets/avatars/1.jpg'},
      {user: 'Team Chokshi', avatar: './assets/avatars/2.jpg'},
      {user: 'Team Shyam', avatar: './assets/avatars/3.jpg'}
    ];

  position: any = '';
  imgPosition: any = '';
  avatar: String = '';
  sendmessage: String = '';
  emojiText: String = '';
  backgroundImage: String = './assets/avatars/download.png';
  username: String = '';
  messageData: Message= new Message();
  gifUrl: String = '';
  messageArray: Message[] = [];


  constructor(private _chatService:ChatService) {

          this._chatService.newUserJoined()
          .subscribe(data=> this.messageArray.push(data));


          this._chatService.newMessageReceived()
          .subscribe(data=>this.messageArray.push(data));
      }

      join(channelName, username){
        this.imgPosition = this.clients.find(e => e.user === username);
        this.avatar = this.imgPosition.avatar;

        this._chatService.joinRoom({user: username, channelName: channelName});
      }


      sendMessage(channelName, username, sendmessage)
      {
        if(typeof this.username !== 'undefined'){
          if(this.sendmessage !== '') {

              this.position = this.clients.find(e => e.user === username);

              //console.log(this.position);

              this.messageData.user = username;
              this.messageData.avatar = this.position.avatar;

              //this.messageData.user = username;
              this.messageData.message = sendmessage;
              ///this.messageData.message = `${sendmessage}${this.emojiText}`;
              this.messageData.date = new Date();
              this.messageData.gif = '';
              //this.messageData.avatar = this.avatar;

              console.log(this.messageData);
              let send = JSON.stringify(this.messageData);

              this.showEmojiPicker = false;

              let data = JSON.parse(send);
              this.messageArray.push(data);

              this._chatService.sendMessage({user:this.username, channelName:this.channelName, message: send});
            }
          this.sendmessage = '';
        }
      }

      addEmoji(event) {
            const emoji = `${event.emoji.native}`;
            this.emojiText = this.emojiText + emoji;
            console.log(this.emojiText);

            this.sendmessage = this.sendmessage.concat(this.emojiText.toString());
            this.emojiText = '';
      }

      sendGif(channelName, username){
        this.gifUrl = GifsComponent.url;
        console.log(GifsComponent.url);
        if(this.gifUrl !== '') {

            this.position = this.clients.find(e => e.user === username);

            //console.log(this.position);

            this.messageData.user = username;
            this.messageData.avatar = this.position.avatar;
            this.messageData.message='';
            this.messageData.gif = this.gifUrl;

            this.messageData.date = new Date();

            console.log(this.messageData);
            let send = JSON.stringify(this.messageData);

            let data = JSON.parse(send);
            this.messageArray.push(data);

            this.showGiphyModule = false;

            this._chatService.sendMessage({user:this.username, channelName:this.channelName, message: send});
          }
          else{
            alert('gif not received');
          }
      }

}
