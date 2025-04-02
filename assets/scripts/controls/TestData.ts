import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestData')
export class TestData
{
    static Round1: number[][] = [
        [1, 4, 7, 1, 2], 
        [5, 7, 2, 6, 5], 
        [0, 1, 6, 8, 0], 
        [6, 5, 2, 5, 2]
    ];

    static Round2: number[][] = [
        [3, 1, 1, 3, 2], 
        [3, 3, 3, 0, 2], 
        [2, 6, 5, 5, 5], 
        [0, 0, 0, 0, 5]
    ];

    static Round3: number[][] = [
        [1, 4, 7, 1, 2], 
        [1, 7, 4, 1, 3], 
        [0, 2, 6, 2, 1], 
        [6, 3, 6, 6, 2]
    ];


    static Round4: number[][] = [
        [1, 4, 7, 1, 2], 
        [1, 4, 7, 1, 2], 
        [4, 1, 2, 1, 2], 
        [1, 3, 2, 3, 2]
    ];


    static Round5: number[][] = [
        [1, 4, 7, 1, 2], 
        [0, 0, 0, 5, 2], 
        [2, 6, 6, 4, 2], 
        [2, 5, 2, 0, 5]
    ];

    static Round6: number[][] = [
        [1, 4, 7, 1, 2], 
        [0, 6, 0, 5, 2], 
        [2, 6, 6, 4, 2], 
        [2, 5, 2, 0, 5]
    ];

    //突然达成了 有动画
   // static Round6: number[] =  [0, 6, 0, 5, 2]
}


