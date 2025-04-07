import { _decorator, Component, resources, JsonAsset } from 'cc';
import { RotaryData } from './protocolData/RotaryData';

const { ccclass, property } = _decorator;

@ccclass('JsonLoader')
export class JsonLoader extends Component {
    start() {
        this.loadJsonData();
    }

    loadJsonData() {
        resources.load("sever_datas/sever_respones", JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error("加载 JSON 失败", err);
                return;
            }

            // 解析 JSON 数据
            let jsonData: RotaryData[] = jsonAsset.json as RotaryData[];
            console.log("加载的 JSON 数据:", jsonData);
        });
    }
}
