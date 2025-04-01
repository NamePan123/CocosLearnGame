import { _decorator, Component, Node } from 'cc';
import { CellData } from './CellData';
import { SymbolDefine } from './SymbolDefine';
import { ReelRuleData } from './ReelRuleData';
import { ReelState } from './ReelState';
import { TestData } from '../controls/TestData';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel  {



    //单例
    private static _instance: GameModel | null = null;


    //动画控制数据
    private _reelRuleDatas:ReelRuleData[] = Array<ReelRuleData>();

    private _downGrids: CellData[][] = [];//下面3排

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
    
    private _curData:number[][];
    public SetData(data:number[][], refulshView:boolean = true)
    {
         this._curData = data;
         for(let i:number = 0; i < data.length; i++){
            let cel = data[i];
            for(let j:number = 0; j < cel.length; j++){
                let cell:CellData = this.GetCellDataByIndex(i, j);
                let index = data[i][j];
                cell.SetIndex(index, refulshView);
            }
         }
            
    }


    public CheckDatas():{ row: number; col: number }[]{
        let value:boolean = false;
        let matchedCells = this.GetWinningIndices(this._curData);
        matchedCells.forEach(element => {
         
           var Cell:CellData = this.GetCellDataByIndex(element.row, element.col);
           Cell.SetWin(true, true);
           value = true;
        });
        return matchedCells;
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
   


    public MoveMatrix(deleteIndices: { row: number, col: number }[]): void {

       
        const copyData = this._curData.map(row => row.slice());
        console.log(deleteIndices);

        const rowCount = copyData.length;
        const colCount = copyData[0].length;
    
        // 1. 删除指定位置的数据（用 null 表示删除）
        // 这里可以加上边界检查，确保不会访问超出索引的元素
        for (const { row, col } of deleteIndices) {
            if (row >= 0 && row < rowCount && col >= 0 && col < colCount) {
                copyData[row][col] = -1;
            }
        }
    
        // 2. 对每一列处理：将未删除的数字下移（保持原有顺序），顶部空缺用 11～20 的随机数填充
        for (let col = 0; col < colCount; col++) {
            // 收集当前列中未被删除的数字
            const remain: number[] = [];
            for (let row = 0; row < rowCount; row++) {
                if (copyData[row][col] !== -1) {
                    remain.push(copyData[row][col]);
                }
            }
    
            // 计算需要填充的空缺数
            const missingCount = rowCount - remain.length;
    
            // 生成 missingCount随机数
            const randomNumber = Math.floor(Math.random() * 9)
            const fillValues: number[] = Array.from({ length: missingCount }, () => randomNumber);
    
            // 组合新列数据：先填充随机数，再接上剩余数据
            const newCol = fillValues.concat(remain);
    
            // 将新列数据写回新矩阵
            for (let row = 0; row < rowCount; row++) {
                copyData[row][col] = newCol[row];
            }
        }

        this.SetData(copyData, true);
        
    }




    //判断中奖规则的结果
    public GetWinningIndices(grid: number[][]): { row: number; col: number }[] {
        const winningIndices: { row: number; col: number }[] = [];
      
        // 遍历每一行
        grid.forEach((row, rowIndex) => {

          if(rowIndex == 0){ 
             return;
          }

          const firstSymbol = row[0];
          let count = 1;
      
          // 从第二个符号开始判断连续的相同符号数量
          for (let colIndex = 1; colIndex < row.length; colIndex++) {
            if (row[colIndex] === firstSymbol) {
              count++;
            } else {
              break;
            }
          }
      
          // 如果连续相同的符号数量达到3个或以上，则记录这些索引
          if (count >= 3) {
            for (let i = 0; i < count; i++) {
              winningIndices.push({ row: rowIndex, col: i });
            }
          }
        });
        
        return winningIndices;
      }


}
