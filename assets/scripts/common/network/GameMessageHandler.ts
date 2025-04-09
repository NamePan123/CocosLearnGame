import { _decorator, Component, Node } from 'cc';
import { SocketManager } from './SocketManager';
import { NetEvent } from '../Define';
import { PlayerModel } from '../../models/PlayerModel';
const { ccclass, property } = _decorator;

@ccclass('GameMessageHandler')
export class GameMessageHandler{
    

    private static _instance: GameMessageHandler | null = null;

    private constructor() {
    }
    
    public static get Instance(): GameMessageHandler {
        if (!this._instance) {
            this._instance = new GameMessageHandler();
        }
        return this._instance;
    }

    public SendVerifyUserToSever():void{

        SocketManager.Instance.Send(NetEvent.VerifyUser, PlayerModel.Instance.CVerifyUser);
    }

    public SendEnterRoomToSever():void{

        SocketManager.Instance.Send(NetEvent.UserRoomIn, { userID: PlayerModel.Instance.UserID });
    }
    

    public ResonesMessageHandler(type:string, data:any){

        console.error("收到服务器数据：" + type + "," + JSON.stringify(data));
        switch(type){

            case NetEvent.VerifyUser:
                PlayerModel.Instance.UserID = data.userID;
                GameMessageHandler.Instance.SendEnterRoomToSever();
                break;
            case NetEvent.UserRoomIn:

            break;
        }

    }

    public HandlerGameMessage(data:msg.S_Game_Messge){

        console.log(data.subCMD + "," + data.mainCMD);
        //初始化数据
        if(data.mainCMD == 1 && data.subCMD == 100){
            
        }
    }



}


