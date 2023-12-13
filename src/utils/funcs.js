export const jalaliMonth = (x) => {
    switch (x) {
        case '١':
            return "فروردین";

        case '۲':
            return "اردیبهشت";

        case '۳':
            return "خرداد";

        case '۴':
            return "تیر";

        case '۵':
            return "مرداد";

        case '۶':
            return "شهریور";

        case '۷':
            return "مهر";

        case '۸':
            return "آبان";

        case '۹':
            return "آذر";

        case '۱۰':
            return "دی";

        case '۱۱':
            return "بهمن";

        case '۱۲':
            return "اسفند";

        default:
            throw new Error("month should be between 1 and 12")
    }
}
export const giveMeDateInFa = (str) => {
    const result = str.split('/');
    result[1] = jalaliMonth(result[1])
    return result;
};
