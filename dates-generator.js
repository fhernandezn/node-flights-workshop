module.exports = (start, end, days) => {
    startDate = new Date(start);
    finalDate = new Date(end);
    const dates = [];
    let i = 0;
    
    while(dateToYMD(startDate) != dateToYMD(finalDate)) {
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + days);
    
        dates[i] = {
            start: dateToYMD(startDate),
            end: dateToYMD(endDate)
        };
    
        startDate.setDate(startDate.getDate() + 1);
        i++;
    }

    return dates;
};

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}