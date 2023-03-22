interface Ivote {
    progressBar : string
    votesCount : string
    addresses : string
    voteWeight : string
    status : string
}

const items : Ivote[]=[
    {
        progressBar : '',
        votesCount : '0',
        addresses : '0xc4...2391',
        voteWeight : '5000',
        status : 'WITH',
    },
    {
        progressBar : '',
        votesCount : '0',
        addresses : '0xc4...2391',
        voteWeight : '5000',
        status : 'AGAINST',
    },
    {
        progressBar : '',
        votesCount : '0',
        addresses : '0xc4...2391',
        voteWeight : '5000',
        status : 'ABSTAIN',
    },
]

export {Ivote , items}