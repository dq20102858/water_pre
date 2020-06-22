//格式化时间
export function formatDate(val) {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/')
  }
  var date = new Date(val);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "年" + month + "月" + day + "日";
}
//格式化时间
export function formatGetDate(val) {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/')
  }
  var date = new Date(val);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "-" + month + "-" + day;
}
//格式化时间戳
export function formatDateTamp (time, type) {
  var timestamp = time
  var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return type == 'date' ? Y + M + D : Y + M + D + h + m + s
}