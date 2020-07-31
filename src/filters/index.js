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
export function formatDateTamp(time, type) {
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

export function dateDifference(sDate1, sDate2) {
  var dateSpan,
    tempDate,
    iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  if(dateSpan<0){
    iDays=0;
 }
  return iDays
};