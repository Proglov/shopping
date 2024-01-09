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
export const farsiNumCharacter = (x) => {
    switch (x) {
        case '0':
            return "۰";

        case '1':
            return "١";

        case '2':
            return '۲';

        case '3':
            return '۳';

        case '4':
            return '۴';
        case '5':
            return '۵';

        case '6':
            return '۶';

        case '7':
            return '۷';

        case '8':
            return '۸';
        case '9':
            return '۹';

        default:
            return x
    }
}

export const convertToFarsiNumbers = str => {
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
        newStr += farsiNumCharacter(str[i]);
    }
    return newStr
}

export const giveMeDateInFa = (str) => {
    const result = str.split('/');
    result[1] = jalaliMonth(result[1])
    return result;
};

export function formatPrice(price) {
    const formatter = new Intl.NumberFormat('fa-IR');
    
    return formatter.format(price);
}