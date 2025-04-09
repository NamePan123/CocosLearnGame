import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerModel')
export class PlayerModel{
  
    private static _instance: PlayerModel | null = null;

    private _c_verifyUser: msg.C_VerifyUser;

    public get CVerifyUser(): msg.C_VerifyUser{
        return this._c_verifyUser;
    }

    private constructor() {
    }
    
    public static get Instance(): PlayerModel {
        if (!this._instance) {
            this._instance = new PlayerModel();
        }
        return this._instance;
    }

  
    public UserID:string = null;

    public InitModel():void{

        this._c_verifyUser = {};
        this._c_verifyUser.params =
        {
            uuid: "5d137e8a63c743bda3c5a6068b309712"
        }

        this._c_verifyUser.guestID = this._c_verifyUser.params.uuid
        this._c_verifyUser.loginType = 6;
        this._c_verifyUser.params.clientType = "tw";
    }




}


