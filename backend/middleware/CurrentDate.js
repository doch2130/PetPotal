exports.CurrentTimeStamp = () => {
    const landDate = new Date();
    const year = landDate.getFullYear();
    const month = landDate.getMonth()+1;
    const date = landDate.getDate();
    const hour = landDate.getHours();
    const minute = landDate.getMinutes();
    const seconds = landDate.getSeconds();
    const milsec = landDate.getMilliseconds();

    return `${year}.${month}.${date}_${hour}:${minute}:${seconds}:${milsec}`;
}