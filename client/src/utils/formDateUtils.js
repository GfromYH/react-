/*
格式化时间的公共模块
 */

export function formDate(timer) {
    const time=new Date(timer)
    if (!time) {
        return ''
    }
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}:${time.getSeconds().toString().padStart(2,'0')}`
}
