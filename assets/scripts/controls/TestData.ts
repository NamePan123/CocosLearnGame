import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestData')
export class TestData
{
    public Round1: number[][] = [
        [5, 7, 2, 6, 5], 
        [0, 1, 6, 3, 0], 
        [6, 5, 2, 5, 2]
    ];

    public Round2: number[][] = [
        [4, 3, 3, 0, 0], 
        [4, 3, 6, 3, 1], 
        [4, 1, 4, 0, 4]
    ];

    public Round3: number[][] = [
        [1, 7, 4, 1, 3], 
        [0, 2, 6, 2, 1], 
        [6, 3, 6, 6, 2]
    ];


    public Round4: number[][] = [
        [1, 4, 7, 1, 2], 
        [4, 1, 2, 1, 2], 
        [1, 3, 2, 3, 2]
    ];


    public Round5: number[][] = [
        [0, 0, 0, 5, 2], 
        [2, 6, 6, 4, 2], 
        [2, 5, 2, 0, 5]
    ];

    //突然达成了 有动画
    public Round6: number[] =  [0, 6, 0, 5, 2]
}


