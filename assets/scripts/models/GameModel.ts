import { _decorator, Component, Node } from 'cc';
import { CellData } from './CellData';
import { SymbolDefine } from './SymbolDefine';
import { ReelRuleData } from './ReelRuleData';
import { ReelState } from './ReelState';

import { RotaryData } from './protocolData/RotaryData';
import { GameController } from '../controls/GameController';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel  {

    public betList: number[] = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2, 2.4, 3, 3.6, 4.2, 4.8, 5.4, 6, 12,
        18, 24, 30, 36, 42, 48, 50, 54, 60, 90, 100, 120, 150, 180, 200, 210, 240, 250, 270, 300, 350, 400, 450, 500];

    public betMul:number;
    public betScore:number;
    public money:number;
    public prizePerRound:number;
    public RoundCount:number = 0;
    //单例
    private static _instance: GameModel | null = null;
    //动画控制数据
    private _reelRuleDatas:ReelRuleData[] = Array<ReelRuleData>();

    private _downGrids: CellData[][] = [];//下面3排
    private _curIndex:number;
    private _contorler:GameController;
    private constructor() {
       this.InitGrids();
       this.ConfigReelAnimation();
    }

    public static get Instance(): GameModel {
        if (!this._instance) {
            this._instance = new GameModel();
        }
        return this._instance;
    }

    public InitModel(contorler:GameController){
        this._contorler = contorler;
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
    
    private _datas:msg.FruitData[];
    public SetData(data:msg.FruitData[], refulshView:boolean = true)
    {
         this._datas = data;
         this._curIndex = 0;
         this.RenderByIndexNext(refulshView);     
    }

    private _totalCount:number;
    private _openFree:number;
    private _isStartFree:boolean = false;
    private _nextGameMode:number;
    private RenderByIndexNext(refulshView:boolean = true):void{

        let rotaryData:msg.FruitData = this._datas[this._curIndex];

        if ((rotaryData.openFreeNum && rotaryData.openFreeNum > 0) || rotaryData.type == 1) {
            this._totalCount = rotaryData.freeNum + rotaryData.openFreeNum
            if (rotaryData.freeNum > 0) {
                this._totalCount = this._totalCount - 1;
            }
            this._openFree = rotaryData.openFreeNum
            this._isStartFree = true;
            if (rotaryData.type == 0) {
               this._nextGameMode = 1;
            }
        }

        let data:number[][] = rotaryData.rotary;
        for(let i:number = 0; i < 3; i++){
            let cel = data[i];
            for(let j:number = 0; j < cel.length; j++){
                let cell:CellData = this.GetCellDataByIndex(i + 1, j);
                let index = data[i][j];
                cell.SetIndex(index, refulshView);
            }
        }  
        this.RoundCount ++;
    }


    public RenderNext():void{
        this._curIndex ++;
        this.RenderByIndexNext();
    }   
    



    public CheckDatas():msg.FruitData{
        //判断有没有中奖
        let rotaryData:msg.FruitData = this._datas[this._curIndex];
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

    public ParseInitDataFromSever(dataMsg: msg.S_Game_Messge):void{

      
        

        this.RoundCount = 0;
        this.betScore = data.backUi && data.backUi.betScore || this.betList[10]
        this.betMul = data.backUi && data.backUi.betMul || 3;
        this.money = data.backUi.ui.score;
        this.prizePerRound = data.backUi.ui.prizePerRound;
        this.SetData(data.backUi.ui.fruitData, true);
        this._contorler.GameInitData();

    }

    public ParseRoundFromData(data: msg.DataCMD_3_2):void{

        this.RoundCount = 0;
        this.money = data.score;
        this.prizePerRound = data.prizePerRound;
        this.SetData(data.fruitData, false);
        this.ResetReel();
        if( this._contorler != null &&  this._contorler != undefined){

            this._contorler.StartRound();
        }
        else{
            
            console.error("this._contorler 是空的：" + this._contorler);
        }
        this._contorler.GameUpdateData();
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
