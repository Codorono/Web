
const c_nDayTicks = 24 * 60 * 60 * 1000

function GetPlural(nNumber)
{
    return (nNumber === 1) ? "" : "s"
}

function GetPlurale(nNumber)
{
    return (nNumber === 1) ? "" : "es"
}

function IsLeapYear(nYear)
{
    return (((nYear & 3) === 0) && (((nYear % 100) !== 0) || ((nYear % 400) === 0)))
}

function GetDaysInMonth(nYear, nMonth)
{
    const c_nMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let nDaysInMonth = c_nMonthDays[nMonth]

    if ((nMonth === 1) && IsLeapYear(nYear))
    {
        nDaysInMonth = 29
    }

    return nDaysInMonth
}

function GetDaysInYear(nYear)
{
    return IsLeapYear(nYear) ? 366 : 365
}

function GetDayOfYear(oDate)
{
    let nThisUtcTicks = Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate())
    let nJan1UtcTicks = Date.UTC(oDate.getFullYear(), 0, 1)

    return ((nThisUtcTicks - nJan1UtcTicks) / c_nDayTicks) + 1
}

function GetPercentOfYear(oDate)
{
    let nThisUtcTicks = Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), oDate.getHours(), oDate.getMinutes(), oDate.getSeconds(), oDate.getMilliseconds())
    let nJan1UtcTicks = Date.UTC(oDate.getFullYear(), 0, 1)

    let nYearTicks = GetDaysInYear(oDate.getFullYear()) * c_nDayTicks

    return Math.floor(((nThisUtcTicks - nJan1UtcTicks) * 100) / nYearTicks)
}

function GetWeekOfYear(oDate)
{
    let oThisWeekDate = new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate())
    oThisWeekDate.setDate(oThisWeekDate.getDate() + (4 - (oThisWeekDate.getDay() || 7)))

    let oJan4WeekDate = new Date(oThisWeekDate.getFullYear(), 0, 4)
    oJan4WeekDate.setDate(oJan4WeekDate.getDate() + (4 - (oJan4WeekDate.getDay() || 7)))

    let nThisWeekUtcTicks = Date.UTC(oThisWeekDate.getFullYear(), oThisWeekDate.getMonth(), oThisWeekDate.getDate())
    let nJan4WeekUtcTicks = Date.UTC(oJan4WeekDate.getFullYear(), oJan4WeekDate.getMonth(), oJan4WeekDate.getDate())

    return ((nThisWeekUtcTicks - nJan4WeekUtcTicks) / (7 * c_nDayTicks)) + 1
}

function GetEventDays(oDate, strEvent, strVerb, nYear, nMonth, nDay)
{
    let nThisUtcTicks = Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate())
    let nEventUtcTicks = Date.UTC(nYear, nMonth - 1, nDay)

    let nEventDiffDays = ((nEventUtcTicks - nThisUtcTicks) / c_nDayTicks)

    return "<b>" + strEvent + "</b> " + strVerb + " in " + nEventDiffDays + " day" + GetPlural(nEventDiffDays)
}

function GetChrono()
{
    let strToday = "Chrono"

    let oNow = new Date()

    strToday += " - " + "<b>Today</b> is " + oNow.toDateString()

    let strUserAgent = navigator["userAgent"]

    let strEdgeVersion = strUserAgent.match(/Edg\/((?:\d+\.){3}\d+)/)[1]

    if (strEdgeVersion == null)
    {
        strToday += " - " + "Edge Version null"
    }

    else
    {
        if (strEdgeVersion.endsWith(".0.0.0"))
        {
            strEdgeVersion = strEdgeVersion.substring(0, strEdgeVersion.length - 6)
        }

        strToday += " - " + "<b>Edge version</b> is " + strEdgeVersion + "<br />"
    }

    return strToday
}
