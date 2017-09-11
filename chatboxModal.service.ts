import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatboxModalObservableService {

    constructor()
    {
        console.log("ChatboxModalObservableService service instanciated");
        
    }
  // Observable string sources
   openchatwindow:Subject<any> = new Subject<any>();
   closechatwindow:Subject<any> = new Subject<any>();
  

  // Observable string streams
  openchatwindow$ = this.openchatwindow.asObservable();
  closechatwindow$ = this.closechatwindow.asObservable();
  

  // Service message commands
  displaychatbox(info:any):void{
    console.log('chatbox is displayed command triggered');
    this.openchatwindow.next(info);
    
  }
 
  closechatbox():void
  {
    console.log('closechatbox called');
    this.closechatwindow.next();
  }

 
}


@Injectable()
export class MessageObservableService {

    constructor()
    {
        console.log("chatMessageObservableService");
    }
  // Observable string sources
   messageArrived:Subject<any> = new Subject<any>();
  

  // Observable string streams
  messageArrvied$ = this.messageArrived.asObservable();
  

  // Service message commands
  PublishMessage(message:any):void{
    console.log('chatmessage is published');
    this.messageArrived.next(message);
    
  }

 
}


@Injectable()
export class DomMessageObservableService {

    constructor()
    {
        console.log("DomMessageObservableService");
    }
  // Observable string sources
   domMessageArrived:Subject<any> = new Subject<any>();
  

  // Observable string streams
  domMessageArrvied$ = this.domMessageArrived.asObservable();
  

  // Service message commands
  PublishMessage(message:any):void{
    console.log('domMessage is published');
    this.domMessageArrived.next(message);
    
  }

 
}