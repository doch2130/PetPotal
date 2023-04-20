exports.CurrentTimeStamp = () => {
    const landDate = new Date();
    const year = landDate.getFullYear();
    const month = landDate.getMonth()+1;
    const date = landDate.getDate();
    let hour = landDate.getHours();
    hour = ("0" + hour).slice(-2);
    const minute = landDate.getMinutes();
    const seconds = landDate.getSeconds();
    const milsec = landDate.getMilliseconds();

    return `${year}-${month}-${date}T${hour}:${minute}:${seconds}.${milsec}`;
}