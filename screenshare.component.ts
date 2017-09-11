import{Component,forwardRef,AfterViewInit,NgZone } from '@angular/core';
import{DomMessageService} from './domMessage.service';
import {ChatboxModalObservableService } from './chatboxModal.service';
import { ScreencastService } from './screencast.service';
import{DomMessage} from './Message';
import{MaskDisplay,Guid} from './utility';
import{EventMessage}from './EventMessage';
import {EventMessageService} from './eventMessage.service';
import {config} from './config';
@Component({
    selector:"share-screen",
    template:`<hr/><div class="screenshare" >
                <div><button screenshare id="btnsharescreen" (click)="onSharescreen()">{{btnText}}</button>
                     <button screenshare id="GiveControl" (click)="EnableSharing()">{{controlsharingbuttonText}}</button>
                     <label >No of user connected : {{0}}</label></div>
                <div id='ssmodule' *ngIf="isVisible==1">
                    <input type="text" value={{screencastservice.CobrowsingUrl}}/>
                </div></div>
                <chat-modal></chat-modal>
                <hr/>`,
    styleUrls:['./../app.component.css'],
    providers:[EventMessageService]
    

})
export class SharescreenComponent  {
    isVisible:boolean=false;
    ssurl:string = "";
    key:any;
    chatroomId:string ='';
    btnText:string=config.cobrowsingbuttonTextBefore;
   
    controlsharingbuttonText:string="Give Control";
    controlShared:boolean;
    IgnoreControls:string[]=["btnChatMessageSend","chatInput","chatHistory"];
    constructor(private zone:NgZone,
                private cbeventserver:EventMessageService,
                private screencastservice:ScreencastService)
    {
        this.controlShared = false;  
        this.screencastservice.EventService = this.cbeventserver;    
    }

   
    

    EnableSharing():void{
    this.controlShared = !this.controlShared;
    this.screencastservice.ControlSharing =this.controlShared;
    
     if(this.controlShared)
        {
            this.controlsharingbuttonText = "Take back Control";
            this.screencastservice.EnableKeyUpEvent = false;
        }
    else
        {
            this.controlsharingbuttonText = "Give Control";
            this.screencastservice.EnableKeyUpEvent = true;
        }
  }

    onSharescreen():void{
      this.isVisible=!this.isVisible; 
      
      if(this.isVisible)
        {
          this.screencastservice.StartCobrowsing();
          this.btnText=config.cobrowsingbuttonTextAfter;
            
        }else{
            this.screencastservice.StopCobrowsing();
            this.btnText=config.cobrowsingbuttonTextBefore;
               
           }
        
      }



   



      



//  screenshotBlobPage():any {

//     //  this.urlsToAbsolute(document.images);
//    //    this.urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
//       //  var screenshot2 = document.documentElement.cloneNode(true);
//         let screenshot2 = document.getElementById("mastercontent").cloneNode(true);
//     //    alert(screenshot2.childNodes.length);
//        let screenshot = screenshot2 as HTMLElement;
//         let b = document.createElement('base');
//         b.href = document.location.protocol + '//' + location.host;
//         //var head = screenshot.querySelector('head');
//        // head.insertBefore(b, head.firstChild);
//         screenshot.style.pointerEvents = 'none';
//         screenshot.style.overflow = 'hidden';
//         screenshot.style.webkitUserSelect = 'none';
//       //  screenshot.style.mozUserSelect = 'none';
//         screenshot.style.msUserSelect = 'none';
//      //   screenshot.style.oUserSelect = 'none';
//         screenshot.style.userSelect = 'none';
//     let top  = window.pageYOffset || document.documentElement.scrollTop,
//     left = window.pageXOffset || document.documentElement.scrollLeft;
//        // this.currentscroll.sy = top.toString();
//       //  this.currentscroll.sx = left.toString();
// //          var script = document.createElement('script');
// //          script.textContent = 'alert("1");window.scrollTo('+top+','+left+');';
// //          screenshot.appendChild(script);
        
//         let elmns = screenshot.querySelectorAll("input[type=text]");
//         let orgelmns = document.getElementById("mastercontent").querySelectorAll("input[type=text]");
//              for( let i=0; i <elmns.length; i++){
//                let htmlElem = elmns[i];
//                let elemValue =(orgelmns[i] as HTMLInputElement).value;
          
//                htmlElem.setAttribute("value",elemValue);
            
//            }

//          elmns = screenshot.querySelectorAll("select");
//          orgelmns = document.getElementById("mastercontent").querySelectorAll("select");
//              for( let i=0; i <elmns.length; i++){
//                let htmlElem = elmns[i];
//                let elemValue =(orgelmns[i] as HTMLSelectElement).selectedIndex;
//           console.log("selectedindex: "+elemValue);
//                htmlElem.setAttribute("SI",elemValue.toString());/// as HTMLSelectElement).selectedIndex=elemValue;
            
//            }
    
//     var blobMessage = new Blob([screenshot.outerHTML],{type:'text/html'});

//     // let message = new SocketMessage2("3", blobMessage,"0","0","0",left.toString(),top.toString(),"0","0")
           
//         return message;
// }

}