/* eslint-disable import/no-commonjs */
/**
    统一格式
    {
        code: '',
        date: '',
        name: '',
        nums_1: [],
        nums_2: [],
        salesmoney: '',
        poolmoney: '',
        prizegrades: [
            {
                type: 1,
                typename: '一等奖',
                typemoney: "7108275",
                typenum: "9"
            }
        ]
    }
*/

const { lotteryRuleMap } = require('./common').default;

const chinaNumber = [
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', 
    '十一', '十一', '十二', '十三', '十四', '十五',
]

function formatWelfareData(type, payload) {

    const transform = (type, payload) => {
        return {
            code: payload.code,
            date: payload.date,
            name: payload.name,
            nums_1: payload.red.split(','),
            nums_2: payload.blue.split(','),
            rule: lotteryRuleMap[type],
            salesmoney: payload.sales,
            poolmoney: payload.poolmoney,
            prizegrades: payload.prizegrades.map((item, index) => {
                return {
                    type: item.type,
                    typename: `${chinaNumber[index]}等奖`,
                    typemoney: item.typemoney,
                    typenum: item.typenum
                }
            })
        }
    }

    if (Array.isArray(payload)) {
        return payload.map(item => transform(type, item))
    } else if (typeof payload === 'object') {
        return transform(type, payload)
    }
}

function formatMotionData(type, payload) {

    const transform = (type, payload) => {
        let nums = payload.lotteryDrawResult.split(' ')
        let nums_1 = []
        let nums_2 = []

        if (type === 'dlt' || type === 'qxc') {
            nums_2 = [nums[nums.length - 1]]
            nums_1 = nums.slice(0, nums.length - 1)
        } else {
            nums_1 = nums
            nums_2 = []
        }
        return {
            code: payload.lotteryDrawNum,
            date: payload.lotteryDrawTime,
            name: payload.lotteryGameName,
            nums_1,
            nums_2,
            rule: lotteryRuleMap[type],
            salesmoney: payload.totalSaleAmount,
            poolmoney: payload.poolBalanceAfterdraw,
            prizegrades: payload.prizeLevelList.map((item, index) => {
                return {
                    type: item.sort,
                    typename: item.prizeLevel,
                    typemoney: item.stakeAmountFormat,
                    typenum: item.stakeCount,
                }
            })
        }
    }
    
    if (Array.isArray(payload)) {
        return payload.map(item => transform(type, item))
    } else if (typeof payload === 'object') {
        return transform(type, payload)
    }
}

exports.default = {
    formatMotionData,
    formatWelfareData
}