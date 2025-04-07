import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export interface PrizeDetail {
    icon: number;
    hitLine: number;
    line: number;
    gold: number;
    mul: number;
    prizeIndex: number[];
}
