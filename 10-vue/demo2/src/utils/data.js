
/*  
{
    name:1,
    obj:{
        beginTime: XXX
        endTime: XXX
    },
    age: null
}

*/
// 手动拼接 url后半截
export function transParams(params){
    // get name= & obj[beginTime] = XXX
    let result = ''

    for (const keyName of Object.keys(params)) {
        // 通过 属性名拿到 value
        const value = params[keyName]
        // encodeURIComponent把参数名编码（简单数据类型
        const part = encodeURIComponent(keyName) + "="
        // 排除空数据
        if (value != null && value != '' && typeof(value) != 'undefined') {
            // 特殊处理数组和对象
            if (typeof(value) == 'object') {
                /* 
                   obj:{
                        beginTime: XXX
                        endTime: XXX
                        all: null
                    },
                    arr: [0, 5] 
                    =====> obj[beginTime]   obj[endTime]  arr[0]  arr[1]
                */
               for (const key of Object.keys(value)) {
                // 排除空数据
                if (value[key] != null && value[key] != '' && typeof(value[key]) != 'undefined') {
                    // obj[beginTime]   obj[endTime]  arr[0]  arr[1]
                    let newParams = keyName + '[' + key + ']'
                    let subpart = encodeURIComponent(newParams) + "="
                    //  obj[beginTime] = XXX&&obj[xx]=xx
                    result += subpart + encodeURIComponent(value[key]) + "&"
                }
               }
            }else{
                // 简单数据类型
                result += part + encodeURIComponent(value) + '&'
            }
        }

    }
    return result

}