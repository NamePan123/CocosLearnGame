import { _decorator, Component, Node } from 'cc';
import { SocketEvent } from "../Define";
import { NetEvent } from "../Define";
import io from "./libs/socket.io.js";
import Encrypt from './Encrypt';
import Util from '../Util';
import { GameMessageHandler } from './GameMessageHandler';
import { TipsManager } from '../../controls/TipsManager';
const { ccclass, property } = _decorator;

@ccclass('SocketManager')
export class SocketManager extends Component {

    private static _instance: SocketManager | null = null;

    public static get Instance():SocketManager
    {

        return SocketManager._instance;
    }

    private _transfer: msg.S_Game_Messge[] = [];
    private _connectStatus:boolean = false;
    private _connectId:string = "0";
    private _reconnectCount:number = 0;
    private _socket: SocketIOClient.Socket;
    private _url:string = null;



    start() {
        
        SocketManager._instance = this;
      
    }

    update(deltaTime: number) {
        
    }

    // 发送消息
    public Send(event: string, ...args: any[]): void {
        if (this._connectStatus) {
            console.error("消息发出：" + event + ","+   JSON.stringify(args[0]));
            event = Encrypt.packetEvent(event, this._socket)
            let arg = Encrypt.packetData(args[0], this._socket)
            this._socket.emit(event, arg)
        } else {
            console.log("网络未连接")
        }
    }

    public SendGameMessge(data?: msg.S_Game_Messge) {

        if (this._socket == null || !this._connectStatus) {
            // setTimeout(this.SendGameMessge.bind(this), 1000);
             return;
         }
        data && this._transfer.push(data);
        if (data) {
          
            console.error("消息发出" + data.mainCMD + "," + data.subCMD + ":" + JSON.stringify(data));
        }
       
        for (var i = 0; i < this._transfer.length; i++) {
            data = Encrypt.packetData(this._transfer[i], this._socket);
            this._socket.send(data);
        }
        this._transfer.length = 0;
    }


    //连接到服务器
    public Connect(url): void {

        this._url = url;
        this._socket = io.connect(this._url, { /*path: `/${Config.path}/socket.io`,*/ reconnection: false }) 

        for (let key in NetEvent) {
            this._socket.on(Encrypt.packetEvent2(NetEvent[key]), function (data) {
                data = Encrypt.decryptData2(data);
                GameMessageHandler.Instance.ResonesMessageHandler(key, data);
            })
        }

 
        this._socket.on(SocketEvent.SOCKET_CONNECT, this.onSocketConnect.bind(this));
        this._socket.on(SocketEvent.SOCKET_MESSAGE, this.ReceiveSeverMessage.bind(this));       
        this._socket.on(SocketEvent.SOCKET_DISCONNECT, this.onSocketDisconnect.bind(this));

    }   

    private onSocketDisconnect(){

        this._socket.off(SocketEvent.SOCKET_CONNECT, this.onSocketConnect.bind(this));
        this._socket.off(SocketEvent.SOCKET_MESSAGE, this.ReceiveSeverMessage.bind(this));       
        this._socket.off(SocketEvent.SOCKET_DISCONNECT, this.onSocketDisconnect.bind(this));
        this._socket = null;
        this._connectId = "0";
        this._reconnectCount = 0;
        this._connectStatus = false;
        this.schedule(this.Reconnect.bind(this), 10);
        console.error("服务器断开链接....");
    }

    private Reconnect() {

        if(!this._connectStatus)
        {   
            this._reconnectCount ++;
            let tip:string = "网络繁忙,正在重连...(第{0}次)";
            tip = tip.replace("{0}", this._reconnectCount.toString());
            TipsManager.Instance.ShowSimpleTips(TipsManager.RECONNECT_TIPS, "");
            this.Connect(this._url);
            console.error("正在重连....");
        }
    }

    private onSocketConnect(){
        
        this.unschedule(this.Reconnect);
      

        this._connectStatus = true;
        if(this._connectId === "0"){

            this._connectId =  Util.generateUUID();

            this.HandShake(this._connectId);
   
            GameMessageHandler.Instance.SendVerifyUserToSever();
        }
        else{

            this.HandShake(this._connectId);
        }
        console.log("服务器链接上了哦：this._connectId" + this._connectId);
    }



    private ReceiveSeverMessage(data:msg.S_Game_Messge){

        console.log(JSON.stringify(data));
        GameMessageHandler.Instance.HandlerGameMessage(data);
    }

    

    private HandShake(id:string):void{
        this._socket.emit("handshakeData", '{"id":"' + id + '","version":"201805241102"}');   
    }

}


