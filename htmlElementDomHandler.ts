import{MaskDisplay} from './utility';
import{config} from './config';

export class HtmlElementDomHandler{
    private _screenshot:HTMLElement;

    public set Screenshot(screenshot:HTMLElement)
    {
        this._screenshot = screenshot;
    }
    public get Screenshot()
    {
        return this._screenshot;
    }
    ManageHTMLBeforeTransfer():void
    {
        this
            .HandleInputElement()
            .HandleSelectElement();
       
    }
    ManageHTMLBeforeMirroring():void
    {
        this.HandleSelectElementBeforeMirror();
    }
  private  HandleInputElement():HtmlElementDomHandler
    {
      this._screenshot =  HtmlInputElementDomHandler.RetainValueAsAttribute(this._screenshot);
      return this;
    }
  private    HandleSelectElement():HtmlElementDomHandler
    {
        this._screenshot = HtmlSelectElementDomHandler.RetainSelectedOption(this._screenshot);
        return this;
    }
  private HandleSelectElementBeforeMirror():void{
      HtmlSelectElementDomHandler.DisplayProperSelectedOption();
  }

}



export class HtmlInputElementDomHandler{

   static RetainValueAsAttribute(screenshot:HTMLElement):HTMLElement
    {
        let elmns = screenshot.querySelectorAll("input[type=text]");
        
        let orgelmns = document.getElementById(config.masterContainerId).querySelectorAll("input[type=text]");
             for( let i=0; i <elmns.length; i++){
               let htmlElem = elmns[i];
               
               let shouldMask = (htmlElem as HTMLInputElement).getAttribute("data-mask");
               console.log("shouldMask"+shouldMask);
               let elemValue =(orgelmns[i] as HTMLInputElement).value;
               if(shouldMask != null && shouldMask == 'true')
                {
                    console.log("inside if condition");
                    elemValue =  MaskDisplay.MaskInput(elemValue);
                    console.log(elemValue);
                }
               htmlElem.setAttribute("value",elemValue);
                
           }
            return screenshot;
    }    
}
export class HtmlSelectElementDomHandler{

   static RetainSelectedOption(screenshot:HTMLElement):HTMLElement
    {
        let elmns = screenshot.querySelectorAll("select");
        let orgelmns = document.getElementById(config.masterContainerId).querySelectorAll("select");
             for( let i=0; i <elmns.length; i++){
               let htmlElem = elmns[i];
               let elemValue =(orgelmns[i] as HTMLSelectElement).selectedIndex;
                console.log("selectedindex: "+elemValue);
                htmlElem.setAttribute("SI",elemValue.toString());/// as HTMLSelectElement).selectedIndex=elemValue;
                }
        return screenshot; 
    }
    
    static DisplayProperSelectedOption():void
    {
       console.log("displaying proper selected option in select control");
       let mastercontainerElement = document.getElementById(config.masterContainerId);
       console.log(mastercontainerElement);
       if(mastercontainerElement!=null || mastercontainerElement !=undefined)
        {
         let selectElements = mastercontainerElement.querySelectorAll("select");
         if(selectElements != null || selectElements != undefined)
            {
                for(let i=0; i<selectElements.length;i++)
                {
                    console.log("inside loop")
                
                    let selectElement = selectElements[i];
                    console.log(selectElement);
                    let si = selectElement.getAttribute("si");
                    console.log(si);
                    selectElement.selectedIndex = parseInt(si);

                }
            }
        }
    }
}