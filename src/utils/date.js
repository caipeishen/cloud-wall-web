var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var month = day * 30;

//获取个性化时间差 
export function getDateDiff(dateStr){
  let dateTimeStamp = dateStr;// Date.parse(dateStr.replace(/-/gi,"/")); //字符串转换为时间戳
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){
      //若日期不符则弹出窗口告之
      console("结束日期不能小于开始日期！");
  }
  var yearC = diffValue/(12*month);
  var monthC = diffValue/month;
  var weekC = diffValue/(7*day);
  var dayC = diffValue/day;
  var hourC = diffValue/hour;
  var minC = diffValue/minute;
  let result = null;
  if(yearC >= 1){
      result = parseInt(yearC) + "年前";
  }
  else if(monthC >= 1){
      result = parseInt(monthC) + "个月前";
  }
  else if(weekC>=1){
      result = parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
      result = parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
      result = parseInt(hourC) +"个小时前";
  }
  else if(minC>=1){
      result = parseInt(minC) +"分钟前";
  }else{
      result="刚刚";
  }
  return result;
}