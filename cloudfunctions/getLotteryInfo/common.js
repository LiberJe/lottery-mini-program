/* eslint-disable import/no-commonjs */
const lotteryTypeMap = {
    'ssq': 'welfare', // 双色球
    'kl8': 'welfare', // 快乐8
    '3d': 'welfare', // 福彩3d
    'qlc': 'welfare', // 七乐彩
    'dlt': 'motion', // 大乐透
    'pls': 'motion', // 排列三
    'plw': 'motion', // 排列五
    'qxc': 'motion', // 七星彩
}

const lotteryRuleMap = {
    'ssq': '每周二、四、日开奖', // 双色球
    'kl8': '每日开奖', // 快乐8
    '3d': '每日开奖', // 福彩3d
    'qlc': '每周一、三、五开奖', // 七乐彩
    'dlt': '每周一、三、六开奖', // 大乐透
    'pls': '每日开奖', // 排列三
    'plw': '每日开奖', // 排列五
    'qxc': '每周二、五、日开奖', // 七星彩
}

exports.default = {
    lotteryTypeMap,
    lotteryRuleMap,
}