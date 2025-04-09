import { _decorator, Component, Node } from 'cc';
import { CellData } from './CellData';
import { SymbolDefine } from './SymbolDefine';
import { ReelRuleData } from './ReelRuleData';
import { ReelState } from './ReelState';

import { RotaryData } from './protocolData/RotaryData';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel  {

    //单例
    private static _instance: GameModel | null = null;
    //动画控制数据
    private _reelRuleDatas:ReelRuleData[] = Array<ReelRuleData>();

    private _downGrids: CellData[][] = [];//下面3排
    private _curIndex:number;
    private constructor() {
       this.InitGrids();
       this.ConfigReelAnimation();
    }

    public static Instance(): GameModel {
        if (!this._instance) {
            this._instance = new GameModel();
        }
        return this._instance;
    }
    
    private InitGrids()
    {
        let id_index:number = 0;
        for(let i = 0; i < 4; i++) {

            this._downGrids[i] = Array<CellData>();
            for(let j = 0; j < 5; j++) {
                this._downGrids[i].push(new CellData(i,j,id_index));
                id_index ++;
            }
        }
    }

    //通过行 列取的数据         5            4
    public GetCellDataByIndex(row:number, col:number):CellData
    {
        return this._downGrids[row][col];
    }
    
    private _datas:RotaryData[];
    public SetData(data:RotaryData[], refulshView:boolean = true)
    {
         this._datas = data;
         this._curIndex = 0;
         this.RenderByIndexNext(refulshView);     
    }


    private RenderByIndexNext(refulshView:boolean = true):void{

        let rotaryData:RotaryData = this._datas[this._curIndex];
        let data:number[][] = rotaryData.rotary;
        for(let i:number = 0; i < 3; i++){
            let cel = data[i];
            for(let j:number = 0; j < cel.length; j++){
                let cell:CellData = this.GetCellDataByIndex(i + 1, j);
                let index = data[i][j];
                cell.SetIndex(index, refulshView);
            }
        }  
        
    }


    public RenderNext():void{
        this._curIndex ++;
        this.RenderByIndexNext();
    }   
    



    public CheckDatas():RotaryData{
        //判断有没有中奖
        let rotaryData:RotaryData = this._datas[this._curIndex];
        //大于0的 就是中奖了
        if(rotaryData.prizeIndex.length > 0){

            const result = this.Get2DIndices(rotaryData.rotary, rotaryData.prizeIndex);
            result.forEach(element => {
               let cellData:CellData = this.GetCellDataByIndex(element[0] + 1,element[1]);
               cellData.SetWin(true, true);
            });
            
            return rotaryData;
        }

        return null;
    }


    private Get2DIndices<T>(matrix: T[][], indices: number[]): [number, number][] {
       
        const numCols = matrix[0].length;
        
        return indices.map(index => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          return [row, col];
        });
      }

    //-------------------------------动画控制-----------------------------------------


    public ResetReel(){

        this._reelRuleDatas.forEach(element => {
            element.Start = false;
        });


        this._downGrids.forEach(element => {
            element.forEach(data => {
                data.SetWin(false, false);
            });
        });
    }

    public GetReelRuleDataByIndex(index:number):ReelRuleData{

        return  this._reelRuleDatas[index];
    }

    public MaxReelTime:number;

    private ConfigReelAnimation(){

        this._reelRuleDatas.push(this.CreateReelRuleData(1000, ReelState.IDLE, 0, 50));
        this._reelRuleDatas.push(this.CreateReelRuleData(1000, ReelState.IDLE, 200, 50));
        this._reelRuleDatas.push(this.CreateReelRuleData(1000, ReelState.IDLE, 400, 50));
        this._reelRuleDatas.push(this.CreateReelRuleData(1000, ReelState.IDLE, 600, 50));
        this._reelRuleDatas.push(this.CreateReelRuleData(1000, ReelState.IDLE, 800, 50));
        this.MaxReelTime = 2600;
    }

    private CreateReelRuleData(duration:number, state:ReelState, delay:number, speed:number):ReelRuleData{

        let rule:ReelRuleData = new ReelRuleData();
        rule.Delay = delay;
        rule.Duration = duration;
        rule.Speed = speed;
        rule.State = state;
        rule.Start = false;
        return rule;
    }
   



}
