module.exports={
    plugins:[
        require('autoprefixer')({
            browsers: ['last 10 Chrome versions','Opera >=10','last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ]
}