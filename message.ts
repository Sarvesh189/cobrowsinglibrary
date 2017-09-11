export class DomMessage
{
   
    constructor( public MessageType:string,
            public Message:string, 
            public UserCount:string, 
            public ChatRoomId:string,
            public UserId:string,
            public ScrollX:string, 
            public ScrollY:string, 
            public X:string, //MouseX 
            public Y:string, //MouseY
            public ControlSharingEnabled:boolean){}

    GetMessageInfo():string{
        return "MessageType: "+this.MessageType+ " Message: "+this.Message + " chatroomid "+this.ChatRoomId;

    }
}

export class UserInfoMessage
{
    public MessageType:string;
    public UserCount:string;
    public Message:string;
    private static instance:UserInfoMessage;
    private constructor(){
        
        this.Message="";
        this.UserCount="0";
        this.MessageType="-1";
        
    }
   SetUserInfoMessage(messagetype:string,usercount:string,message:string):void
    {
        this.Message=message;
        this.UserCount=usercount;
        this.MessageType=messagetype;
    }
    static get Instance()
    {
        if (this.instance === null || this.instance === undefined) {
                this.instance = new UserInfoMessage();
            
             }
            return this.instance;
    }
}
//export let userInfoMessage = new UserInfoMessage();