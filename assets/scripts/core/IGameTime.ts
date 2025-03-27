import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export interface IGameTime 
 {
    StartTime(beginTime:number):void;
    GameUpdate(gameTime:number):void;
    CurrentTime():number;
    Pause():void;
    Resume():void;
    Reset():void;

}


