import{Component,Pipe,PipeTransform,KeyValueDiffers,Inject,ViewEncapsulation,OnInit,HostListener} from '@angular/core';
import{DomMessageService} from './domMessage.service';
import { DomSanitizer,DOCUMENT } from '@angular/platform-browser';
import{ActivatedRoute} from'@angular/router';
import {ChatboxModalObservableService,MessageObservableService,DomMessageObservableService } from './chatboxModal.service';
import{MouseEventMessage,KeyPressEventMessage} from './EventMessage';
import {EventMessageService} from './eventMessage.service';
import {CobrowsingHtmlHelper} from './utility';
import{config} from './config';
//import {} from './eventMessageHandler';
import{HtmlElementDomHandler} from './htmlElementDomHandler';


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
   // console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);

  }
}



@Component({
    selector:"mirror",
    styleUrls: [], 
    template:`<div id="content" [innerHTML]="message|safeHtml" ></div>
              <chat-modal></chat-modal>`,
    providers:[EventMessageService],
    encapsulation: ViewEncapsulation.None
    
})
export class MirrorComponent implements OnInit
{
    message:string;
    differ: any;
    chatroomId:string;
 htmlElementDomHandler:HtmlElementDomHandler;
    //handleEvent:HandleEvent;
    constructor(public domMsgService:DomMessageService,
                public domSanitize:DomSanitizer,
                private differs: KeyValueDiffers,
                @Inject(DOCUMENT) private  mirrordocument: 
                Document, private currentroute:ActivatedRoute,
                private modalService:ChatboxModalObservableService,
                private messageOservice:MessageObservableService,
                private domMsgOservice:DomMessageObservableService,
                private eventMsgService:EventMessageService)
    {
     
         console.log("Mirror component instanciation started");
   //   this.handleEvent = new HandleEvent();
        let chtrmId='';
        currentroute.url.forEach(function(item) { 
       
            if(item[1]!=null)
                {         
                  chtrmId = item[1].toString();
                }
            });
        this.chatroomId = chtrmId;
        this.htmlElementDomHandler = new HtmlElementDomHandler();
        console.log("chatroomId:" + this.chatroomId);
        
      this.domMsgOservice.domMessageArrvied$.subscribe((info:any)=>{console.log("subscription is called");this.Display(info);});
     // this.differ = differs.find({}).create(undefined);
      console.log("Mirror-component instanciated") 
      }
      Display(info:any):void{
        console.log("displaying DOM Message on mirror screen");
        this.message = info.Message;
        console.log("displayed the Dom message");
        this.handleSelectItem();
      }
      @HostListener('click',['$event'])
      onClick(evt:MouseEvent)
      {
        if(this.domMsgService.message.ControlSharingEnabled)
          {      
            let parentlocation = CobrowsingHtmlHelper.getMasterContainerOffset();
            let mouseMsg = new MouseEventMessage(1,evt.srcElement.className+"$"+evt.srcElement.nodeName+"$"+evt.srcElement.id,'click','','',false,false,evt.pageX,evt.pageY,evt.clientX+window.scrollX,evt.clientY+window.scrollY,'','','','','','',parentlocation.left,parentlocation.top);
             this.eventMsgService.sendMessage(mouseMsg);  
          }   
         
      }

       @HostListener('keypress',['$event'])
      onKeyPress(evt:KeyboardEvent)
      {
        console.log("key press started");
       if(this.domMsgService.message.ControlSharingEnabled)
          {
            let keyMsg = new KeyPressEventMessage(0,evt.srcElement.nodeName,  evt.srcElement.className, evt.srcElement.id,'div','keyPress','','',false,false,evt.altKey,evt.ctrlKey,evt.shiftKey,evt.metaKey,0,0,evt.key);
           this.eventMsgService.sendMessage(keyMsg);     
            console.log("key press message sent");
          }
      }

    

      ngOnInit()
      {

        if(this.modalService != null)
          {
            this.modalService.displaychatbox(this.chatroomId);
          }
         else {
             console.log("modal service is null");
         }       

         this.domMsgService.connect(this.chatroomId);
         this.eventMsgService.connect(this.chatroomId).then((item)=>{console.log(item)});
      }
     

      handleSelectItem():void{
         setTimeout(()=> {
          this.htmlElementDomHandler.ManageHTMLBeforeMirroring();  
        }, 10);
       
      
      }

 }
