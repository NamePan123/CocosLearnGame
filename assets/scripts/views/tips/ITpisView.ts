import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export interface ITpisView {

      get Btn1():Button;
      get Btn2():Button;
      SetLable(value1:string, value2:string);
      Visible(value:boolean):void;
}


