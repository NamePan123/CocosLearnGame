import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SymbolDefine')
export class SymbolDefine 
{
    static readonly Play_win:string = "win";
    static readonly Play_idle:string = "idle";
    static readonly Play_spawn:string = "spawn";

    
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
    
   
    static readonly Index_0:number = 0;
    static readonly Index_1:number = 1;
    static readonly Index_2:number = 2;
    static readonly Index_3:number = 3;
    static readonly Index_4:number = 4;
    static readonly Index_5:number = 5;
    static readonly Index_6:number = 6;
    static readonly Index_7:number = 7;
    static readonly Index_8:number = 8;
    static readonly Index_9:number = 9;


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
    
    static GetNameBlurByIndex(index: number): string {
        switch (index) {
            case SymbolDefine.Index_0:
                return SymbolDefine.Number_0_blur;
            case SymbolDefine.Index_1:
                return SymbolDefine.Number_1_blur;
            case SymbolDefine.Index_2:
                return SymbolDefine.Number_2_blur;
            case SymbolDefine.Index_3:
                return SymbolDefine.Number_3_blur;
            case SymbolDefine.Index_4:
                return SymbolDefine.Number_4_blur;
            case SymbolDefine.Index_5:
                return SymbolDefine.Number_5_blur;
            case SymbolDefine.Index_6:
                return SymbolDefine.Number_6_blur;
            case SymbolDefine.Index_7:
                return SymbolDefine.Number_7_blur;
            case SymbolDefine.Index_8:
                return SymbolDefine.Number_8_blur;
            case SymbolDefine.Index_9:
                return SymbolDefine.Number_9_blur;
            default:
                return SymbolDefine.Number_0_blur;// 未匹配时返回 -1
        }
    }
    

    static GetNameByIndex(index: number): string {
        switch (index) {
            case SymbolDefine.Index_0:
                return SymbolDefine.Number_0;
            case SymbolDefine.Index_1:
                return SymbolDefine.Number_1;
            case SymbolDefine.Index_2:
                return SymbolDefine.Number_2;
            case SymbolDefine.Index_3:
                return SymbolDefine.Number_3;
            case SymbolDefine.Index_4:
                return SymbolDefine.Number_4;
            case SymbolDefine.Index_5:
                return SymbolDefine.Number_5;
            case SymbolDefine.Index_6:
                return SymbolDefine.Number_6;
            case SymbolDefine.Index_7:
                return SymbolDefine.Number_7;
            case SymbolDefine.Index_8:
                return SymbolDefine.Number_8;
            case SymbolDefine.Index_9:
                return SymbolDefine.Number_9;
            default:
                return SymbolDefine.Number_0; // 未匹配时返回 -1
        }
    }

    public static GetRandomIcon():string[]{
        const randomNumber = Math.floor(Math.random() * 9);
        
        let names:string[] = Array<string>();
        names[0] = this.GetNameByIndex(randomNumber);
        names[1] =this.GetNameBlurByIndex(randomNumber);
        return names;
    }


}


