import { _decorator, Component, Node } from 'cc';
import { ReelState } from './ReelState';
const { ccclass, property } = _decorator;

@ccclass('ReelRuleData')
export class ReelRuleData {
    
    public Duration:number;//持续时间 
    public State:ReelState;//根据状态去处理滚动阶段
    public Speed:number;//滚动的速度
    public Delay:number;//延迟多久后播放
    public Start:boolean = false;
}


