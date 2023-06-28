exports.CurrentTimeStamp = () => {
    const landDate = new Date();
    const year = landDate.getFullYear();
    const month = ("0" + parseInt(landDate.getMonth()+1)).slice(-2);
    const date = ("0" + landDate.getDate()).slice(-2);
    const hour = ("0" + landDate.getHours()).slice(-2);
    const minute = landDate.getMinutes();
    const seconds = landDate.getSeconds();
    const milsec = landDate.getMilliseconds();

    return `${year}-${month}-${date}T${hour}:${minute}:${seconds}.${milsec}`;
}