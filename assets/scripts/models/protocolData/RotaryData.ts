import { _decorator, Component, Node } from 'cc';
import { PrizeDetail } from './PrizeDetail';
const { ccclass, property } = _decorator;


export interface RotaryData {
    rotary: number[][];
    prizeIndex: number[];
    prizeIcon: number[];
    prizeDetail: PrizeDetail[];
}


