import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TpisViewBase')
export class TpisViewBase extends Component {

      public get Btn1():Button{
            return  null;
      }
      public get Btn2():Button{
            return  null;
      }
      public SetLable(value1:string, value2:string){

      }
      public Visible(value:boolean):void{

      }
}


