import { _decorator, Component, Node } from 'cc';
import { CellData } from './CellData';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel  {

    private static _instance: GameModel | null = null;

    private _downGrids: CellData[][] = [];//下面3排
    //private _up_grids: CellData[] = Array<CellData>();//最上面那一排 第一排是看不见的
    private constructor() {
       this. InitGrids();
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

    public ParseData(data:number[][])
    {
        
            
    }


}
