

export default (dripMinute, dripperSpacing, rowWidth) => {


    const drip = 0.1;
    const litre = 1000;

    const temp = drip * dripMinute;
    const temp2 = temp * 60;
    const litreHour = temp2 / litre;
    const temp3 = dripperSpacing * rowWidth;
    const result = litreHour / temp3;

    return result;

}