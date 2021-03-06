export class GlobalConstants {
    
    // user_id: string = "623fc38ca14aa782fec3bef1" 
    //user_id: string = "623c1917b98cd2ec0b9e7fe3"
    // user_id:string = "624a7b1eafc80938f563df0a";    
    
    user_id: string|null;   

    constructor(){        
        this.user_id = sessionStorage.getItem('user');
    }   
    
    getUserId() :string {
        if(!this.user_id){
            return ""
        }
        return this.user_id;
    }

    setUserID(id: string) :void{
        this.user_id = id;
    }


}