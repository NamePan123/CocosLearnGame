declare namespace msg {
    enum LoginType {
        ThirdLogin = 6,
    }

    interface C_VerifyUser_Params {
        forwardHost?: string
        kindId?: number
        moduleId?: number
        path?: string
        roomId?: number
        uuid?: string
        clientType?: string
    }

    interface C_VerifyUser {
        guestID?: string
        loginType?: number
        params?: C_VerifyUser_Params
        serverType?: number
    }

    interface S_VerifyUser {
        errMsg?: any
        ftodayascore?: number
        recommendGameID?: string
        bankAcer?: number
        experience?: number
        type?: number
        twoPasswordType?: number
        userID?: number//玩家在服务器中的userID
        uuid?: string
        score?: number,//玩家当前的分数
        revenue?: number
        mobileVerifyLevel?: number
        merchantId?: number
        weightLimitScore?: number
        moorMachine?: string
        todayDrawWashCode?: number
        typeID?: number
        pointCoupons?: number
        active?: number
        frozen?: number
        weight?: number
        faceID?: number //头像ID
        hasOpenID?: boolean
        paySum?: number
        loginTs?: number//登录时间
        waitWriteScore?: boolean
        payGoodsRMB?: number
        pwdErrNum?: number
        luckyRMB?: number
        hasWeiXin?: boolean
        gameID?: number//游戏ID
        isLookon?: number
        ftodaydscore?: number
        logoutTs?: number//玩家上一次的登出时间
        gender?: number
        hasAccount?: boolean
        loginType?: number
        memberOrder?: number
        todayWashCode?: number
        userLevel?: number
        washCode?: numbe
        loginTime?: string
        twoPassword?: boolean
        nickname?: string//玩家昵称
        experienceCardNum?: number
        acer?: number
        fcastscore?: number
        yesterWashCode?: number
        hasMobile?: boolean
        washCodeStatus?: number
        parentId?: number
        washcastCode?: number
        fscore?: number
        guestID?: string
        zParentId?: number
        bankScore?: number
        underWrite?: string
        idcard?: string
        serverType?: number
        /**用于其他地方显示 */
        userScore?: number
        betScore?: number
        winScore?: number
        freeNum?: number
    }

    interface S_GameList_Item {
        gameCode?: string
        kindID?: number
        moduleEnName?: string
        moduleID?: number
        moduleName?: string
        sortID?: number
        version?: string
    }

    interface S_SystemNotice {
        gold?: number
        id?: string
    }

    interface roomList {
        androidMaxScore?: number
        androidMinScore?: number
        androidScoreBase?: number
        chairCount?: number
        cheatMode?: number
        cheatProof?: number
        enterScore?: number
        gameCode?: string
        groupID?: number
        host?: string
        isEnterGame?: number
        minScore?: number
        moduleID?: number
        moduleName?: string
        outport?: number
        path?: string
        port?: number
        presetPlayer?: number
        revenue?: number
        roomCard?: number
        roomID?: number
        roomMode?: number
        roomName?: string
        roomType?: number
        sortID?: number
        tableCount?: number
    }

    interface S_GameRoomList {
        room?: any[]
        roomlist?: roomList[]
    }

    interface S_Game_Messge {
        mainCMD: number
        subCMD: number
        data?: any
    }

    // 水果机请求历史记录数据
    interface C_GameLogList {
        startTime?: Date  // 开始时间戳
        endTime?: Date    // 结束时间戳
        pageSize?: number   // 每页数量
        pageNum?: number    // 当前页码
    }

    interface S_GameLogList {
        current?: number //当前页
        records?: RecordsList[]//游戏条数数据
        size?: number  // 每页
        totalBet?: number //总下注
        totalPage?: number // 总页数
        totalPageSize?: number // 总条数
        totalPrize?: number//总中奖金额
        totalWin?: number//总输赢
    }

    interface RecordsList1 {
        baseBet?: number//低分
        orderId?: string//牌局ID
        betScore?: number//投注金额
        logoutTs?: string//时间
        winScore?: number//输赢
        prizeScore?: number//中奖金额
    }

    interface RecordsList {
        betID?: string
        betScore?: number//投注金额
        extendJson?: string
        gameCode?: string
        gameDate?: string
        gameName?: string
        merchantId?: number
        rowId?: number//牌局ID
        userId?: number
        winScore?: number//输赢
    }

    // 单条详细记录
    interface C_GameLogDetail {
        orderId?: string // 订单号
    }

    interface S_GameLogDetail {
        // 待添加
        afterScore?: number //剩余金额
        baseBet?: number//底分
        logoutTs?: string//游戏时间
        orderId?: string//牌局ID
        prizeScore?: number//中奖金额
        winScore?: number//输赢
        betScore?: number//投注金额
        detailData?: DetailData[]
    }

    interface DetailData {
        betMap?: Object//投注
        history?: number[]//开奖结果
        scoreMap?: ScoreMap[]//中奖结果
        totalScore?: number//总分数
        type?: number//特殊棋子
        location?: number
        typeLocation?: number[]
        dice?: number
        guessHistory?: number[]
        winScore?: number
    }

    interface ScoreMap {
        icon?: number
        mul?: number
        num?: number
        win?: number
        sMul?: number
    }

    interface DataCMD_1_100 {
        backUi?: {
            betMul?: number
            betScore?: number
            ui?: DataCMD_3_2
        }
        betScoreList?: number[]
        lastScore?: number
        userID?: number
    }

    interface DataCMD_3_2 {
        fruitData?: FruitData[]
        prizePerRound?: number      // 本次旋转总赢分（是免费场的话是中奖场和所有免费场的总赢分）
        score?: number              // 玩家当前总分数
        play?: boolean
        prizeType?: number

        // isHistory?: boolean         // TODO 确定是否有用
        // historyWinScore?: number    // 历史总赢分（恢复数据，免费场需要）
    }

    interface FruitData {
        doubleMul?: number          // 倍数
        freeNum?: number            // 剩余免费次数
        gold?: number               // 本次消除得分
        prizeIndex?: number[]       // 消除下标
        prizeIcon?: number[]        // 中奖图标
        rotary?: number[][]         // 棋盘数据
        type?: number               // 0普通，1免费
        drop?: boolean              // 是否是掉落数据（用于恢复数据）
        openFreeNum?: number        // 当局旋转开启的免费次数
        historyWinScore?: number    // 历史总赢分（恢复数据，免费场需要）
        prizeType?: number
        freeTotalScore?: number
        prizeDetail?: any[] //中奖线
    }
    interface HitLine {
        public hitLine?: number
        public score?: number
        public card?: number
        public mul?: number
        public hit?: PointSlotEx

    }
    interface C_DataCMD_3_9 {
        startTime?: Date  // 开始时间戳
        endTime?: Date    // 结束时间戳
        pageSize?: number   // 每页数量
        pageNum?: number    // 当前页码
    }

    interface DataCMD_3_9Data {
        current?: number //当前页
        records?: RecordsList[]//游戏条数数据
        size?: number  // 每页
        totalBet?: number //总下注
        totalPage?: number // 总页数
        totalPageSize?: number // 总条数
        totalPrize?: number//总中奖金额
        totalWin?: number//总输赢
    }

    interface DataCMD_3_10Data {
        betAmount?: number
        details?: RecordsDetailsList[]
        loginTs?: string
        logoutTs?: string
        merchantId?: number
        playerName?: string
        rowId?: number
        userId?: number
        winAmount?: number
    }

    interface RecordsDetailsList {
        afterScore?: number
        beforeScore?: number
        betAmount?: number
        betMul?: number
        betid?: string
        ctime?: number
        fireNum?: number
        gameCode?: string
        gameDate?: string
        iconData?: string
        id?: string
        income?: string
        merchantId?: number
        moduleName?: string
        period?: string
        roomID?: number
        userId?: number
        uuid?: number
        winAmount?: number
    }

}
