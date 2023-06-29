exports.CurrentTimeStamp = () => {
    const landDate = new Date();
    const year = landDate.getFullYear();
    const month = ("0" + parseInt(landDate.getMonth()+1)).slice(-2);
    const date = ("0" + parseInt(landDate.getDate())).slice(-2);
    const hour = ("0" + parseInt(landDate.getHours())).slice(-2);
    const minute = ("0" + parseInt(landDate.getMinutes())).slice(-2);
    const seconds = ("0" + parseInt(landDate.getSeconds())).slice(-2);
    const milsec = landDate.getMilliseconds();

    return `${year}-${month}-${date}T${hour}:${minute}:${seconds}.${milsec}`;
}