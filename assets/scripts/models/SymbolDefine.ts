import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SymbolDefine')
export class SymbolDefine 
{
    
    static readonly Number_0:string = "tb_1";
    static readonly Number_0_blur:string = "tb_mh_1";

    static readonly Number_1:string = "tb_2";
    static readonly Number_1_blur:string = "tb_mh_2";

    static readonly Number_2:string = "tb_3";
    static readonly Number_2_blur:string = "tb_mh_3";

    static readonly Number_3:string = "tb_4";
    static readonly Number_3_blur:string = "tb_mh_4";

    static readonly Number_4:string = "tb_5";
    static readonly Number_4_blur:string = "tb_mh_5";

    static readonly Number_5:string = "tb_6";
    static readonly Number_5_blur:string = "tb_mh_6";

    static readonly Number_6:string = "tb_7";
    static readonly Number_6_blur:string = "tb_mh_7";

    static readonly Number_7:string = "tb_8";
    static readonly Number_7_blur:string = "tb_mh_8";

    static readonly Number_8:string = "tb_9";
    static readonly Number_8_blur:string = "tb_mh_9";

    static readonly Number_9:string = "l_j";
    static readonly Number_9_blur:string = "l_j_blur";
    
   

    static GetIndexByName(name: string): number {
        switch (name) {
            case SymbolDefine.Number_0:
            case SymbolDefine.Number_0_blur:
                return 0;
            case SymbolDefine.Number_1:
            case SymbolDefine.Number_1_blur:
                return 1;
            case SymbolDefine.Number_2:
            case SymbolDefine.Number_2_blur:
                return 2;
            case SymbolDefine.Number_3:
            case SymbolDefine.Number_3_blur:
                return 3;
            case SymbolDefine.Number_4:
            case SymbolDefine.Number_4_blur:
                return 4;
            case SymbolDefine.Number_5:
            case SymbolDefine.Number_5_blur:
                return 5;
            case SymbolDefine.Number_6:
            case SymbolDefine.Number_6_blur:
                return 6;
            case SymbolDefine.Number_7:
            case SymbolDefine.Number_7_blur:
                return 7;
            case SymbolDefine.Number_8:
            case SymbolDefine.Number_8_blur:
                return 8;
            case SymbolDefine.Number_9:
            case SymbolDefine.Number_9_blur:
                return 9;
            default:
                return -1; // 未匹配时返回 -1
        }
    }
    

    



}


