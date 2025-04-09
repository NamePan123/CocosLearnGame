// 延用源项目的方法，应该大部分用不上，项目新定义方法写在--------线上面


//工具类
export default class Util {
   
    public static generateUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
   
}