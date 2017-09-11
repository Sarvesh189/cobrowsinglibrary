import{EventMessage,MouseEventMessage,KeyPressEventMessage} from './EventMessage'

import{EventTypeEnum} from './EventMessage';
import{config} from './config';
import{CobrowsingHtmlHelper} from './utility';


export class EventMessageManager
{
    coreMessage:EventMessage;
    eventHandler:IEventMessageHandler;

    ProcessEvent(eventMessage:string):void{
    this.coreMessage = JSON.parse(eventMessage);  
    if(this.coreMessage.EventType==EventTypeEnum.Key)
        {
            this.eventHandler = new KeyEventMessageHandler();
        }
    else
        {
            this.eventHandler = new MouseEventMessageHandler();
        }
        this.eventHandler.ProcessEvent(this.coreMessage);

    }
}

export interface IEventMessageHandler
{
    ProcessEvent(eventMessage:EventMessage):void;
}

export class KeyEventMessageHandler implements IEventMessageHandler{

    ProcessEvent(eventMessage:EventMessage):void{
        let keyMsg = eventMessage as KeyPressEventMessage;
        console.log(keyMsg);
        console.log("KeyEvent Processing started");
        let targetElement:HTMLElement;//=new HTMLElement();
        if(keyMsg.TargetId!=null || keyMsg.TargetId != '')
            {
                if(document !=null)
                    {
                        targetElement =  document.querySelector("#"+keyMsg.TargetId) as HTMLInputElement; 
                        if(targetElement != null)
                            {          
                                console.log(targetElement);
                                let textInput:string='';
                                let inputValue = targetElement.getAttribute("value");
                                textInput = inputValue == null?'':inputValue;
                                textInput = textInput + keyMsg.key;
                                targetElement.setAttribute("value",textInput);
                                targetElement.nodeValue = textInput;
                            }
                            console.log("KeyEvent Processing is done");
                    }
            }
    }
}

export class MouseEventMessageHandler implements IEventMessageHandler{
    ProcessEvent(eventMessage:EventMessage)
    {
        let evtMessage = eventMessage as MouseEventMessage;
        console.log("MouseEvent processing started");
      //   this.evtMessage = JSON.parse(eventMessage);
       console.log(evtMessage);
         let pointX = evtMessage.ClientX - evtMessage.parentX;
         
         
         let pointY = evtMessage.ClientY - evtMessage.parentY;
         
         let masterLocation = CobrowsingHtmlHelper.getMasterContainerOffset(); 
         console.log(masterLocation);
         pointX = pointX + masterLocation.left-window.scrollX;
         pointY = pointY + masterLocation.top-window.scrollY;
         console.log(pointX);
         console.log(pointY);
         let targetElement = document.elementFromPoint(pointX,pointY) as HTMLElement;
         console.log(targetElement);
         if(targetElement != null)
         targetElement.focus();
         let event = new MouseEvent("click",{view:window,bubbles: true,cancelable: true});

         if(targetElement != null)
            {
              targetElement.dispatchEvent(event);  
             // targetElement.focus();
             // console.log("active Element:");
              //console.log(document.activeElement);
            }
            console.log("Mouse event processing is done");
    }

    
}