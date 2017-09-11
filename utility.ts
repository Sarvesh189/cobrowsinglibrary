import{config} from './config';
export class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    static RandomNumber():string {
        let min=10000, max=100000;
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        return result.toString();
    }
}

export class MaskDisplay
{
    static MaskInput(elementValue:any):string
    {
        for(let i=0; i <elementValue.length;i++)
            {
                elementValue = elementValue.replace(/[a-z0-9A-Z]/,'*');
                console.log(elementValue);
            }
        return elementValue;
    }

}

export class CobrowsingHtmlHelper
{
   static getMasterContainerOffset():any {
       let boundingCleintRect:any;
        if(document != null)
        {
        let masterContent = document.getElementById(config.masterContainerId);
            if(masterContent != null)
                {
                    boundingCleintRect = masterContent.getBoundingClientRect();
                }     
        
        return {
          left: boundingCleintRect.left + window.scrollX,
          top: boundingCleintRect.top + window.scrollY
        }
      }
    }
}