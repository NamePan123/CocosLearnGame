import { _decorator, Component, Node } from 'cc';
import { IGameTime } from './IGameTime';
const { ccclass, property } = _decorator;

@ccclass('GameTime')
export class GameTime extends Component implements IGameTime
{

    public  get isPaused():boolean  {
        return this._isPaused;
    }

    public get ISRunning(): boolean {
        return this._isRuuning;
    }

    private _isRuuning = false;
    private _startTime: number = 0;
    private _pausedTime: number = 0;
  
    private _isPaused: boolean = true;
    private _lastPauseTime: number = 0; // 用来记录暂停开始时的时间

    start() {
        // 初始化可以在这里启动游戏计时
    }

    update(deltaTime: number) {
        this.GameUpdate(this.CurrentTime());
    }
    
    public Reset():void
    {
        this._startTime = performance.now();
        this._pausedTime = 0;
        this._isPaused = false;
        this._isRuuning = true;
    }

    // 记录游戏的开始时间
    public StartTime(beginTime: number): void {
        if(this._isRuuning){
           return;     
        }
        this._isRuuning = true;
        this._startTime = performance.now() - beginTime;
        this._pausedTime = 0;  // 重置暂停时间
        this._isPaused = false;
    }

    // 更新游戏的时间
    public GameUpdate(gameTime: number): void {
       
    }

    // 获取当前的游戏时间（包括暂停时间）
    public CurrentTime(): number {
        if (this._isPaused) {
            // 返回暂停时的有效游戏时间
            return this._lastPauseTime - this._startTime - this._pausedTime;
        }
        // 返回当前的有效游戏时间
        return performance.now() - this._startTime - this._pausedTime;
    }

    // 暂停游戏时间
    public Pause(): void {
        if (!this._isPaused) {
            this._lastPauseTime = performance.now();  // 记录暂停开始时的时间
            this._isPaused = true;
           // console.log("Game paused.");
        } else {
            //console.log("Game is already paused.");
        }
    }

    // 恢复游戏时间
    public Resume(): void {
        if (this._isPaused) {
            const resumeTime = performance.now();
            const pauseDuration = resumeTime - this._lastPauseTime;
            this._pausedTime += pauseDuration;  // 累加暂停持续时间
            this._isPaused = false;
            //console.log("Game resumed.");
        } else {
            //console.log("Game is already running.");
        }
    }
}

