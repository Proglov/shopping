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
    if (typeof str !== "string")
        str = str.toString()
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

export function price2Farsi(number) {
    if (number == 0 || number == undefined || number == null) return 'صفر'
    const one2nine = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const eleven2nineteen = ['یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هیجده', 'نوزده'];
    const ten2ninety = ['ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundred2nineHundred = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
    const manyDigits = ['هزار', 'میلیون', 'میلیارد', 'تریلیون', 'هزار تریلیون', 'خیلی زیاد'];

    const numberStr = number.toString().split('');
    const mod = numberStr.length % 3

    let threeDigits = [];

    const temp = []
    for (let i = 0; i < mod; i++) {
        temp.push(numberStr[i])
    }
    threeDigits.push(temp)

    for (let i = mod; i < numberStr.length; i += 3) {
        const digits = []
        for (let j = i; j <= i + 2; j++) {
            digits.push(numberStr[j])
        }
        threeDigits.push(digits)
    }

    const yeRaghami = (arr) => one2nine[arr[0] - 1]

    const doRahami = (arr) => {
        if (arr[0] == 0 && arr[1] == 0)
            return ''
        if (arr[0] == 0)
            return yeRaghami([arr[1]])
        if (arr[0] == 1 && arr[1] != 0)
            return eleven2nineteen[arr[1] - 1]
        if (arr[1] == 0)
            return ten2ninety[arr[0] - 1]
        return ten2ninety[arr[0] - 1] + ' و ' + one2nine[arr[1] - 1]
    }

    const seRaghami = (arr) => {
        if (arr[1] == 0 && arr[2] == 0 && arr[0] == 0)
            return ''
        if (arr[1] == 0 && arr[2] == 0)
            return hundred2nineHundred[arr[0] - 1]
        if (arr[1] == 0 && arr[0] != 0)
            return hundred2nineHundred[arr[0] - 1] + ' و ' + one2nine[arr[2] - 1]
        if (arr[0] == 0)
            return doRahami([arr[1], arr[2]])
        return hundred2nineHundred[arr[0] - 1] + ' و ' + doRahami([arr[1], arr[2]])
    }

    const threeStrs = []
    for (let i = 0; i < threeDigits.length; i++) {
        switch (threeDigits[i].length) {
            case 1:
                threeStrs.push(yeRaghami(threeDigits[i]))
                break;
            case 2:
                threeStrs.push(doRahami(threeDigits[i]))
                break;
            case 3:
                threeStrs.push(seRaghami(threeDigits[i]))
                break;
        }
    }

    let res = ''
    const threeStrsLength = threeStrs.length
    if (threeStrsLength > 1) {
        for (let i = 0; i < threeStrsLength; i++) {
            res += threeStrs[i] + ' '
            if (i !== threeStrsLength - 1) {
                if (threeStrs[i] !== '')
                    res += (manyDigits[threeStrsLength - i - 2] || manyDigits[5])
                if (threeStrs[i + 1] !== '')
                    res += ' و '
            }
        }
    } else
        res += threeStrs[0]

    return res
}

export const isPhoneValid = phone => {
    const regex = /^09\d{9}$/;
    return regex.test(phone)
}

export const isWorkingPhoneValid = phone => {
    const regex = /^0\d{2,3}\d{8}$/;
    return regex.test(phone)
}

export const isEmailValid = email => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email)
}