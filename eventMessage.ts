export const enum EventTypeEnum{    
    Key=0,
    Mouse=1
}

export abstract class EventMessage{
  
    constructor( public EventType:EventTypeEnum, //1 for mouse and 0 for key
    public Target:any,
    public EventName:string, //click, leftclick,rightclick or keyup, keydown
    public Detail:string,
    public View:string,
    public IsBubbles:boolean,
    public IsCancelable:boolean,
    public altKey:any,
    public ctrKey:any,
    public shiftKey:any,
    public metaKey:any,
    public parentX:any,
    public parentY:any
    )
    {
        
       // Logger.log(this.ToString());
    }

    
}

export class KeyPressEventMessage extends EventMessage
{
   
    constructor( public EventType:EventTypeEnum, //1 for mouse and 2 for key
    public Target:string,
    public TargetClass:string,
    public TargetId:string,
    public ParentPath:string,
    public EventName:string, //click, leftclick,rightclick or keyup, keydown
    public Detail:string,
    public View:string,
    public IsBubbles:boolean,
    public IsCancelable:boolean,
    public altKey:any,
    public ctrKey:any,
    public shiftKey:any,
    public metaKey:any,
    public parentX:any,
    public parentY:any,
    public key:any,
    )
    {
       super(EventType,Target,EventName,Detail,View,IsBubbles,IsCancelable,altKey,ctrKey,shiftKey,metaKey,parentX,parentY); 
       // Logger.log(this.ToString());
    }

    
}

//}

export class MouseEventMessage extends EventMessage
{
    constructor( public EventType:EventTypeEnum, //1 for mouse and 2 for key
    public Target:any,
    public EventName:string, //click, leftclick,rightclick or keyup, keydown
    public Detail:string,
    public View:string,
    public IsBubbles:boolean,
    public IsCancelable:boolean,
    public ScreenX:number,
    public ScreenY:number,
    public ClientX:number,
    public ClientY:number,
    public altKey:any,
    public ctrKey:any,
    public shiftKey:any,
    public metaKey:any,
    public Button:any,
    public RelatedTarget:any,
    public parentX:any,
    public parentY:any
    )
    {
       super(EventType,Target,EventName,Detail,View,IsBubbles,IsCancelable,altKey,ctrKey,shiftKey,metaKey,parentX,parentY);
    }
    

}