const fetch = require('node-fetch')
const { lotteryTypeMap } = require('./common').default;

const mixedUrl = (url = '', obj = {}) => {
    let querys = Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
    return `${url}?${querys}`
}

// const lotteryTypeMap = {
//     'ssq': 'welfare', // 双色球
//     'kl8': 'welfare', // 快乐8
//     '3d': 'welfare', // 福彩3d
//     'qlc': 'welfare', // 七乐彩
//     'dlt': 'motion', // 大乐透
//     'pls': 'motion', // 排列三
//     'plw': 'motion', // 排列五
//     'qxc': 'motion', // 七星彩
// }

const motionTypeMap = {
    'dlt': 85, // 大乐透
    'pls': 35, // 排列三
    'plw': 350133, // 排列五
    'qxc': '04', // 七星彩
}

const lotteryReqMap = {
    'welfare': (type = 'ssq', payload = {}) => {
        const data = {
            name: type,
            pageNo: '1',
            pageSize: 30,
            systemType: 'PC',
            ...payload
        }
        const headers = {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
            'Upgrade-Insecure-Requests': 1,
            Cookie: payload.cookie || '',
        }
        return fetch(mixedUrl(
            'http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice',
            data
            ),
            {
                // headers: {
                //     // Cookie: '1',
                //     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
                //     // Host: 'www.cwl.gov.cn',
                //     // 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                //     // 'Cache-Control': 'max-age=0',
                //     // Connection: 'keep-alive',
                //     'Upgrade-Insecure-Requests': 1
                //     // Cookie: 'HMF_CI=b33cd9bcde225bc190821cbc88b1e99bab129ed3deb9a2e19e46c570dc0ca665b9008642ef3df63f918de287b05f52ea2060f7717f8221986fc06f57b21479bab2',
                // },
                headers,
                redirect: 'manual'
            }
        ).then(async res => {
            if (res.status === 302) {
                let cookie = res.headers.get('set-cookie').split(';')[0]
                return fetch(mixedUrl(
                    'http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice',
                    data
                    ),
                    {
                        headers: {
                            ...headers,
                            Cookie: cookie,
                        },
                    }
                )
            }
            return res
        })
    },
    'motion': (type = 'dlt', payload = {}) => {
        return fetch(mixedUrl(
            'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry',
            {
                gameNo: motionTypeMap[type],
                provinceId: 0,
                isVerify: 1,
                pageNo: 1,
                pageSize: 30, 
                ...payload
            }
        ))
    },
}


exports.default = {
    getLotteryDetail (type = '', payload) {
        if (!type) return Promise.resolve(null)

        const reqType = lotteryTypeMap[type]
        return lotteryReqMap[reqType](type, payload)
    }
}