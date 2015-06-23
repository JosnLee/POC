/**
 * 时间工具类
 */
var KtDate = function () {
    return {
        Y_MM_DD: "y-mm-dd",
        YY_MM_DD: "yy-mm-dd",
        HH_MM_SS: "HH:mm:ss",
        YY_MM_DD_HH_MM_SS: "yy-mm-dd HH:mm:ss",

        formatDate: function (date, format) {
            if (null !== date && undefined !== date) {
                return $.datepicker.formatDate(format, date);
            }
            return null;
        },
        formatTime: function (time, format) {
            if (null !== time && undefined !== time) {
                return $.datepicker.formatTime(format, {
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    second: time.getSeconds(),
                    millisec: time.getMilliseconds(),
                    timezone: time.getTimezoneOffset()
                });
            }
            return null;
        },
        formatDateTime: function (dateTime, dateFormat, timeFormat) {
            if (null !== dateTime && undefined !== dateTime) {
                return this.formatDate(dateTime, dateFormat) + " " + this.formatTime(dateTime, timeFormat);
            }
            return null;
        },
        getAgeFromBirthday: function (birth) {
            if (birth) {
                if (birth instanceof Date) {
                    birth = this.formatDate(birth, this.YY_MM_DD);
                }
                var newDate = new Date();
                var currentYear = newDate.getFullYear();
                var currentMonth = newDate.getMonth() + 1;
                var currentDay = newDate.getDate();

                var birthYear = birth.split("-")[0];
                var birthMonth = birth.split("-")[1];
                var birthDay = birth.split("-")[2];

                var myYear = currentYear - parseInt(birthYear);
                var myMonth = currentMonth - parseInt(birthMonth);
                var myDay = currentDay - parseInt(birthDay);

                var s = "";
                if (myDay < 0) {
                    myDay = myDay + 30;
                    myMonth--;
                }
                if (myMonth < 0) {
                    myMonth = myMonth + 12;
                    myYear--;
                }
                if ((myYear <= 0)) {
                    if (myMonth == 0) {
                        s = s + myDay + "天";
                    }
                    else {
//                        s = s + myMonth + "月" + myDay + "天";
                        s = s + myMonth + "个月" + myDay + "天";
                    }
                }
                else {
                    s = myYear + "岁";
                    if (myYear < 6) {
                        s = s + myMonth + "月";
                    }
                }
                if (s == "0天") {
                    s = "1天";
                }
                return s;
            }
        },
        compare: function (date1, date2) {
            var year1 = date1.getFullYear();
            var month1 = date1.getMonth() + 1;
            var day1 = date1.getDate();
            var year2 = date2.getFullYear();
            var month2 = date2.getMonth() + 1;
            var day2 = date2.getDate();
            if (year1 > year2 && month1 > month2 && day1 > day2) {
                return 1;
            } else if (year1 < year2 && month1 < month2 && day1 < day2) {
                return -1;
            } else if (year1 == year2 && month1 == month2 && day1 == day2) {
                return 0;
            }
        },
        plusOrMinus: function (date, interval, num) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            switch (interval) {
                case "YEAR":  year += num; break;
                case "MONTH":  month += num; break;
                case "DATE":  day += num; break;
                case "HOUR":  hour += num; break;
                case "MINUTE":  minute += num; break;
                case "SECOND":  second += num; break;
                default : ;
            }
            var dateStr = year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
            var resultDate = new Date(dateStr);
            return resultDate;
        },
        dateType: {
            "YEAR": "YEAR",
            "MONTH": "MONTH",
            "DATE": "DATE",
            "HOUR": "HOUR",
            "MINUTE": "MINUTE",
            "SECOND": "SECOND"
        }
    };
}();