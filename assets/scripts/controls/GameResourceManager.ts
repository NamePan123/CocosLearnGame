import { _decorator, Component, instantiate, Node, Prefab, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameResourceManager')
export class GameResourceManager extends Component {

    
    public static RESPIRCE_LOAD_COMPELETE:string = "RESPIRCE_LOAD_COMPELETE";
    
    public static _instance:GameResourceManager = null;

    private  _prefabPaths:string[] = Array();
    start() {
        GameResourceManager._instance = this;
    }

    update(deltaTime: number) {
        
    }

    public static get Instance(): GameResourceManager {
       
        return GameResourceManager._instance;
    }   


    public AddLoad(url:string):void{
        this._prefabPaths.push(url);
    }


    public StartLoad():void{
        const loadPrefab = (path) => {
            return new Promise((resolve, reject) => {
                resources.load(path, Prefab, (err, prefab) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(prefab);
                    }
                });
            });
        };
        
        // 使用 Promise.all 并行加载多个预制体
        Promise.all(this._prefabPaths.map(path => loadPrefab(path)))
            .then(prefabs => {
                
                this.node.emit(GameResourceManager.RESPIRCE_LOAD_COMPELETE, prefabs);
            })
            .catch(err => {
                console.error("加载预制体出错：", err);
            });


            this._prefabPaths.length = 0;
    }


}


