import{Injectable} from '@angular/core';
import {DomSanitizer } from '@angular/platform-browser';
import{DomMessage,UserInfoMessage} from './Message';
import{MessageObservableService,DomMessageObservableService} from './chatboxModal.service';
import{config} from './config';
import{DomMessageHandlerContext} from './domMessageHandler.service';

@Injectable()
 export class DomMessageService  {
       mirrorScreenText:string;
       host:string = config.MessagingApi;
       webconnector: WebSocket;
       currentscroll:any={"sx":"","sy":"","x":"","y":""};
       cobrowsingurl:string;
       message:DomMessage;
       userInfo:UserInfoMessage=UserInfoMessage.Instance;
       sx:string;sy:string;
     
       constructor(private msgOService:MessageObservableService,private domMsgOService:DomMessageObservableService)
        {
           // this.currentchatroomid = Guid.RandomNumber();
           console.log("domMessageService is instanciating");
            this.message = new DomMessage("","","","","","","","","",false);
            
        console.log("domMessageService is instanciated");
        }


        connect(chatroomid:string):Promise<boolean>{
       
            console.log("trying to connect chatroomid :"+chatroomid);
       
            if(chatroomid!="")
            {
                
               this.webconnector = new WebSocket(this.host+"?chatroomid="+chatroomid);
            }
            else
            {      
                console.log("chatroomid is null");
                const result = new Promise<boolean>((resolve:any,reject:any)=>{resolve(false);});
                return result;
            }
            this.cobrowsingurl = window.location.host+"/mirror/"+chatroomid;
             
            this.webconnector.onmessage = ((messageEvent)=>{
                    console.log("DomMessage arrived");
                    let domMessageContext = new DomMessageHandlerContext(this.msgOService,this.domMsgOService);
                   domMessageContext.process(messageEvent.data);
                    
                   // this.message = result;
                   // this.sx = result.``
          }
        );
        this.webconnector.onclose = (closeEvent)=>
        {
            console.log(closeEvent.reason);
        }
        return Promise.resolve(true);
       }
      close():void{
         let message = new DomMessage("100", "<div>user stopped sharing.</div>","0","0","0","0","0","","",false);
              console.log(message);
              this.webconnector.send(JSON.stringify(message));
        if(this.webconnector.readyState===WebSocket.OPEN)
        this.webconnector.close();
      }

      
      sendMessage(messageObject:any):void{
            console.log("DomMessage  sending.");
          
            setTimeout(()=> {        

            console.log(messageObject);
            console.log(this);
            this.webconnector.send(JSON.stringify(messageObject));
            console.log("DomMessage sent");
             }, 20);   
      }
      
    }

