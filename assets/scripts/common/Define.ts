export var SocketEvent = {
    SOCKET_CONNECT: "connect",
    SOCKET_DISCONNECT: "disconnect",
    SOCKET_ERROR: "error",
    SOCKET_CONNECT_ERROR: "connect_error",
    SOCKET_RECONNECT_ERROR: "reconnect_error",
    SOCKET_TIMEOUT: "connect_timeout",
    SOCKET_MESSAGE: "message"
}

/**
 * Socket网络事件
 */
export var NetEvent = {
    VerifyUser: "VerifyUser",                   //用户登录
    GameKind: 'GameKind',                       //大厅读取游戏分类
    GameList: "GameList",                       //游戏列表
    GameRoomList: "GameRoomList",               //房间列表
    KickOut: "KickOut",                         //你的号被别人顶下来， 会收到这个信息
    UserRoomIn: "UserRoomIn",                   //用户进入房间
    UserRoomOut: "UserRoomOut",                 //用户离开房间
    UserSitdown: "UserSitdown",                 //用户坐下,
    Logout: "Logout",                           //登出
    SystemNotice: "SystemNotice",               //广播
    GameLogList: "gameLogList",                 //游戏记录
    GameLogDetail: "gameLogDetail",             //游戏详细记录
    UsersGameStatus: "UsersGameStatus",         //用户的游戏状态改变
}

/**
 * GameSocket网络事件
 */
export var netEvent2 = {
    CMD_1_100: "CMD_1_100",                         // 进入房间成功协议
    CMD_3_2: "CMD_3_2",                             // 下注协议
    CMD_3_9: "CMD_3_9",
    CMD_3_10: "CMD_3_10",
}

export var normalEvent = {
    changeSize: "changeSize",                       // 窗口大小改变
    ConnectFail: "ConnectFail",                     // 连接失败
    GameConnectFail: "GameConnectFail",             // 子连接失败
    ReconnectFail: "ReconnectFail",                 // 重连失败
    ConnectSuccess: "ConnectSuccess",               // 连接成功
    AutoSpinRound: "AutoSpinRound",                 // 自动旋转设置
    BetSet: "BetSet",                               // 投注设置
    RecordDateSelect: "RecordDateSelect",           // 选择的日期
    OnClickCard: "OnClickCard",                     // 选牌事件
    FreeModeStartOrEnd: "FreeModeStartOrEnd",       // 免费场游戏开始结束通知
    FreeStartOrEnd: "FreeStartOrEnd",               // 免费开始结束通知（用于切换场景状态）
    CleanOne: "CleanOne",                           // 消除
    CleanAll: "CleanAll",                           // 消除所有，在金币展示之后
    StartShowBigWin: "StartShowBigWin",             // 大奖弹窗显示通知
    PlayTopMulAnim: "PlayTopMulAnim",               // 播放MUL变化
    StartSpin: "StartSpin",                         // 
    StopSpin: "SpinStop",                           // 
    ScoreNotEnough: "ScoreNotEnough",               // 积分不足
    SetStop: "SetStop",                             // 设置急停
    Eliminate: "Eliminate",                      //消除倍数闪烁
    StcTwo: "StcTwo",                               //两个夺宝符号
}