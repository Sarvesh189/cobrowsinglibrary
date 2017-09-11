import{Injectable} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{Guid} from './utility';
import{EventMessage, MouseEventMessage} from './EventMessage';
import{EventMessageManager} from './eventMessageHandler';
import{config} from './config';
// import{SocketMessage,_userInfo,UserInfoMessage} from './Message';
// import{MessageObservableService} from './modal.service';
// import{Logger} from './Utility';

@Injectable()
 export class EventMessageService  {
       
     //  host:string = "ws://localhost:8080/api/EventMessaging";
    host:string=config.Eventapi;
    webconnector:WebSocket;
    message:MouseEventMessage;
    handleEvent:EventMessageManager;
    constructor()
    {
        this.handleEvent = new EventMessageManager();
    }

    connect(chatroomid:string):Promise<boolean>{
        console.log("cbEventSocket Service is trying to connect chatroomid :"+chatroomid);
        if(chatroomid)
            {
                
               this.webconnector = new WebSocket(this.host+"?chatroomid="+chatroomid);
            }
        else
            { 
                console.log("chatroomid is null");
                const result = new Promise<boolean>((resolve:any,reject:any)=>{resolve(false);});
                return result;
              
            }
        
        this.webconnector.onmessage = ((messageEvent)=>{

            console.log("Event Message arrived");
            console.log(messageEvent);
            this.handleEvent.ProcessEvent(messageEvent.data);
            //this. = messageEvent;
            
        
             });     
        
        this.webconnector.onclose = (closeEvent)=>
        {

            console.log(closeEvent.reason);
        }
        return Promise.resolve(true);
       }
      close():void{
        if(this.webconnector.readyState===WebSocket.OPEN)
        this.webconnector.close();
      }

      
      sendMessage(eventMsg:EventMessage):void{
           console.log("event message  sending.");
           console.log(eventMsg);
            setTimeout(()=> {
              this.webconnector.send(JSON.stringify(eventMsg));
              console.log("event message sent");
             }, 500);   
      }
    
    }

