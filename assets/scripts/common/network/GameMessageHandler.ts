import { _decorator, Component, Node } from 'cc';
import { SocketManager } from './SocketManager';
import { NetEvent } from '../Define';
import { PlayerModel } from '../../models/PlayerModel';
import { GameModel } from '../../models/GameModel';
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

    //
    public SendStartRoundToSever(isFree:boolean):void{

        let betScoreValue = GameModel.Instance.betScore;
        let betMulValue = GameModel.Instance.betMul;

        if(isFree){
            
            betScoreValue = 0;
            betMulValue = 0;
        }

        let startData = {
            mainCMD: 3,
            subCMD: 2,
            data:  {
                betScore: betScoreValue,
                betMul: betMulValue,
            }
        };
       
        SocketManager.Instance.SendGameMessge(startData);
    }

    
    public SendRoundEndToSever(times:number):void{
       let end = {
            mainCMD: 3,
            subCMD: 2,
            data: {
                playTimes: times,
            }
        };
        SocketManager.Instance.SendGameMessge(end);
    }
    

    public ResonesMessageHandler(type:string, data:any){

        console.error("收到服务器数据1：" + type + "," + JSON.stringify(data));
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

        console.error("收到服务器数据2：" + "," + data.mainCMD + ":::" +  data.subCMD);
        console.error("数据：" + JSON.stringify(data.data));
        //初始化数据
        if(data.mainCMD == 1 && data.subCMD == 100){

           GameModel.Instance.ParseInitDataFromSever(data.data);
        }
        else if(data.mainCMD == 3 && data.subCMD == 2){

            GameModel.Instance.ParseRoundFromData(data.data);
         }
    }



}


