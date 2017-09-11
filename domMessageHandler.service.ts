//import{Injectable} from '@angular/core';
import{MessageObservableService,DomMessageObservableService} from './chatboxModal.service';
import{DomMessage,UserInfoMessage} from './message';


//Injectable()
export class DomMessageHandlerContext
{
    constructor(private chatMsgObservable:MessageObservableService, private domMsgObservable:DomMessageObservableService)
    {}
    private msgHandler:IDomMessageHandler;
    private result:any;
    process(message:string):any{
        let domMessage:DomMessage = JSON.parse(message);
        switch(domMessage.MessageType)
            {
                case "1":{    
                    this.msgHandler = new ConnectMessageHandler();
                 //   this.result = this.msgHandler.process(domMessage);
                    break;
                }
                case "4":{
                    this.msgHandler = new ChatMessageHandler(this.chatMsgObservable); break;
                   // this.result = this.msgHandler.process(dom)
                }
                default:{
                    this.msgHandler = new DomMessageHandler(this.domMsgObservable);
                    break;
                }
            }
            this.result = this.msgHandler.process(domMessage);
            return this.result;        
    }

}



export interface IDomMessageHandler
{
    process(message:DomMessage):any;
}

export class ChatMessageHandler implements IDomMessageHandler
{
    constructor(private chatMsgObservable:MessageObservableService){}
    process(message:DomMessage):any{
        console.log(message);
         // message.UserId+":"+message.Message;
        this.chatMsgObservable.PublishMessage(message.UserId+":"+message.Message);
    }
}

export class DomMessageHandler implements IDomMessageHandler
{
    constructor(private domMsgObservable:DomMessageObservableService){}
    process(message:DomMessage):any{
        console.log("inside process method of DomMessageHandler")
        console.log(message);
        this.domMsgObservable.PublishMessage(message);
        return message;
    }

}

export class ConnectMessageHandler implements IDomMessageHandler
{
    process(message:DomMessage):any{
        console.log("connect message with userid:"+message.UserId);
        let userInfo = UserInfoMessage.Instance;
        //userInfo.userId = socketMessage.UserId;  
      return  userInfo.SetUserInfoMessage(message.MessageType,message.UserCount,"connected")    


    }

}