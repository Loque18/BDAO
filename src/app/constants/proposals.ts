interface Iproposals {
    status : string
    image : string
    text1 : string
    text2 : string
    smallText : string
}

const items : Iproposals[] = [
    {
        status : '/assets/PENDING.svg',
        image : '/assets/tabler-icon-clock-hour-9.svg',
        text1 : 'VIP-101 Risk Parameters Adjustments for',
        text2 : ' SXP, TRX and ETH',
        smallText : '#001'
    },
    {
        status : '/assets/ACCEPTED.svg',
        image : '/assets/tabler-icon-circle-check.svg',
        text1 : 'VIP-101 Risk Parameters Adjustments for',
        text2 : ' SXP, TRX and ETH',
        smallText : '#002'
    },
    {
        status : '/assets/ACCEPTED.svg',
        image : '/assets/tabler-icon-circle-check.svg',
        text1 : 'VIP-101 Risk Parameters Adjustments for',
        text2 : ' SXP, TRX and ETH',
        smallText : '#002'
    },
]

export {Iproposals , items}