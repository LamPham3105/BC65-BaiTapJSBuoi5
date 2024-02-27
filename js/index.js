function getElementID(id) {
    return document.getElementById(id);
}

function printData(id, result, bgResult) {
    document.getElementById(id).innerHTML = `<div class="${bgResult} mt-3 mb-3 p-3">${result}</div>`;
}

/*--------BÀI TẬP 1--------*/
const AREA_A = "A";
const AREA_B = "B";
const AREA_C = "C";

function getScoreAreaPrioritize(area) {
    switch (area) {
        case AREA_A:
            return 2;
        case AREA_B:
            return 1; 
        case AREA_C:
            return 0.5;
        default: // Khu vực X hay không chọn khu vực
            return 0;
    }
}

const PERSON_ONE = "1";
const PERSON_TWO = "2";
const PERSON_THREE = "3";

function getScorePersonPrioritize(person) {
    switch (person) {
        case PERSON_ONE:
            return 2.5;
        case PERSON_TWO:
            return 1.5; 
        case PERSON_THREE:
            return 1;
        default: // Đối tượng 0 hay không chọn đối tượng
            return 0;
    }
}

function isQualifiedScore(score) {
    return !isNaN(score) && score >= 0 && score <= 10; 
}

function isQualifiedScoreBenchmark(score) {
    return !isNaN(score) && score >= 0 && score <= 30; 
}

function hanldeClassificate() {
    var scoreBenchmark = parseFloat(getElementID('scoreBenchmark').value);
    var scoreOne = parseFloat(getElementID('scoreOne').value);
    var scoreTwo = parseFloat(getElementID('scoreTwo').value);
    var scoreThree = parseFloat(getElementID('scoreThree').value);
    var area = getElementID('area').value;
    var person = getElementID('person').value;

    var result = '';
    if (!isQualifiedScoreBenchmark(scoreBenchmark)) {
        result = "Điểm chuẩn không thể bé hơn 0 hay lớn hơn 30";
    } else if (!isQualifiedScore(scoreOne)) {
        result = "Điểm thứ nhất không hợp lệ. Vui lòng nhập lại từ 0 tới 10";
    } else if (!isQualifiedScore(scoreTwo)) {
        result = "Điểm thứ hai không hợp lệ. Vui lòng nhập lại từ 0 tới 10";
    } else if (!isQualifiedScore(scoreThree)) {
        result = "Điểm thứ ba không hợp lệ. Vui lòng nhập lại từ 0 tới 10";
    }

    var idResult = "classificateResult";
    var bgResult = 'bg-danger';

    if (result != '') {
        printData(idResult, result, bgResult);
        return;
    }

    var sumScore = scoreOne + scoreTwo + scoreThree;

    var scoreArea = getScoreAreaPrioritize(area);
    var scorePerson = getScorePersonPrioritize(person);
    sumScore += scoreArea + scorePerson;

    if (scoreOne == 0 || scoreTwo == 0 || scoreThree == 0) {
        result = `Bạn đã rớt vì có điểm 0. Tổng điểm ${sumScore}`;
    } else if (sumScore >= scoreBenchmark) {
        result = `Bạn đã đậu. Tổng điểm ${sumScore}`;
        bgResult = 'bg-success';
    } else {
        result = `Bạn đã rớt vì không đủ điểm. Tổng điểm ${sumScore}`;
    }

    printData(idResult, result, bgResult);
}

getElementID('hanldeClassificate').onclick = function() {
    hanldeClassificate();
}

/*--------BÀI TẬP 2--------*/
function isQualifiedKW(numberKW) {
    return !isNaN(numberKW) && numberKW >= 0; 
}

function getFormatVND(money) {
    return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

function hanldeElectronicMoney() {
    var personOnHouse = getElementID('personOnHouse').value;
    var numberKW = parseFloat(getElementID('numberKW').value);

    var result = '';
    if (!isQualifiedKW(numberKW)) {
        result = "Số KW không hợp lệ. Vui lòng nhập lại";
    } else if (!personOnHouse) {
        result = "Vui lòng nhập tên người dùng điện";
    }

    var idResult = "electronicMoneyResult";
    var bgResult = 'bg-danger';

    if (result != '') {
        printData(idResult, result, bgResult);
        return;
    }

    var money = 0;
    if (numberKW <= 50) {
        money = numberKW * 500;
    } else if (numberKW <= 100) {
        money = 50 * 500 + (numberKW - 50) * 650;
    } else if (numberKW <= 200) {
        money = 50 * 500 + 50 * 650 + (numberKW - 100) * 850;
    } else if (numberKW <= 350) {
        money = 50 * 500 + 50 * 650 + 100 * 850 + (numberKW - 200) * 1100;
    } else {
        money = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (numberKW - 350) * 1300;
    }

    result = `Số tiền điện ${getFormatVND(money)} của anh/chị ${personOnHouse}`;
    bgResult = 'bg-success';

    printData(idResult, result, bgResult);
}

getElementID('hanldeElectronicMoney').onclick = function() {
    hanldeElectronicMoney();
}

/*--------BÀI TẬP 3--------*/
const MAX_TAX = 4000000;
const ONE_MILLION = 1000000;

function hanldeTax() {
    var personTax = getElementID('personTax').value;
    var income = parseFloat(getElementID('income').value);
    var personDependent = parseFloat(getElementID('personDependent').value);

    var idResult = "taxResult";
    var bgResult = 'bg-danger';

    var result = '';
    if (!personTax) {
        result = "Vui lòng nhập tên người đống thuế";
    } else if (isNaN(income)) {
        result = "Số tiền thu nhập năm không hợp lệ không hợp lệ. Vui lòng nhập lại";
    } else if (!isNaN(personDependent) && (!Number.isInteger(personDependent) || personDependent < 0)) {
        result = "Vui lòng nhập đúng số người phụ thuộc";
    } else if (income <= MAX_TAX) {
        result = "Mức lương không phải đóng thuế";
        bgResult = 'bg-success';
    } 

    if (result != '') {
        printData(idResult, result, bgResult);
        return;
    }

    var tax = income - MAX_TAX - (isNaN(personDependent) ? 0 : personDependent) * 1600000;

    if (tax <= 60000000) {
        tax = tax * 0.05;
    } else if (tax <= 120000000) {
        tax = 60000000 * 0.05 + (tax - 60000000) * 0.1;
    } else if (tax <= 210000000) {
        tax = 60000000 * 0.05 + 60000000 * 0.1 + (tax - 120000000) * 0.15;
    } else if (tax <= 384000000) {
        tax = 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + (tax - 210000000) * 0.2;
    } else if (tax <= 624000000) {
        tax = 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + (tax - 384000000) * 0.25;
    } else if (tax <= 960000000) {
        tax = 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + 240000000 * 0.25 + (tax - 624000000) * 0.3;
    } else {
        tax = 60000000 * 0.05 + 60000000 * 0.1 + 90000000 * 0.15 + 174000000 * 0.2 + 240000000 * 0.25 + 336000000 * 0.3 + (tax - 960000000) * 0.35;
    }

    console.log('tax: ', tax);

    result = `Tiền thuế thu nhập cá nhân của anh/chị ${personTax} là ${getFormatVND(tax)}`;
    bgResult = 'bg-success';

    printData(idResult, result, bgResult);
}

getElementID('hanldeTax').onclick = function() {
    hanldeTax();
}

/*--------BÀI TẬP 4--------*/
const ENTERPRISE = "DN";
const PEOPLE = "ND";
const NONE_DATA = "O";

getElementID('typeCustomer').onchange = function () {
    var typeCustomer = getElementID('typeCustomer').value;
    var connectNumberForm = getElementID('connectNumberForm');

    var display;
    switch (typeCustomer) {
        case ENTERPRISE:
            display = "block";
            break; 
        default:
            display = "none";
            break;
    }

    connectNumberForm.style.display = display;
}

function getMoneyBill(typeCustomer) {
    switch (typeCustomer) {
        case PEOPLE:
            return 4.5;
        case ENTERPRISE:
            return 15;
        default:
            return 0;
    }
}

function getMoneyService(typeCustomer, connectNumber) {
    switch (typeCustomer) {
        case PEOPLE:
            return 20.5;
        case ENTERPRISE:
            if (connectNumber <= 10)
                return connectNumber * 7.5;
            return 10 * 7.5 + (connectNumber - 10) * 5;
        default:
            return 0;
    }
}

function getMoneyCable(typeCustomer, cableNumber) {
    switch (typeCustomer) {
        case PEOPLE:
            return cableNumber * 7.5;
        case ENTERPRISE:
            return cableNumber * 50;
        default:
            return 0;
    }
}

function getFormatUSD(money) {
    return money.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

function hanldeCableMoney() {
    var codeCustomer = getElementID('codeCustomer').value;
    var typeCustomer = getElementID('typeCustomer').value;
    var cableNumber = parseInt(getElementID('cableNumber').value);
    var connectNumber = parseInt(getElementID('connectNumber').value);

    var idResult = "cableMoneyResult";
    var bgResult = 'bg-danger';

    var result = '';
    if (!codeCustomer) {
        result = "Vui lòng nhập mã khách hàng";
    } else  if (typeCustomer === NONE_DATA) {
        result = "Vui lòng chọn loại khách hàng";
    } else if (isNaN(cableNumber)) {
        result = "Vui lòng nhập vào số kênh cao cấp";
    } else if (isNaN(connectNumber) && typeCustomer === ENTERPRISE) {
        result = "Vui lòng nhập vào số kết nối";
    }

    if (result != '') {
        printData(idResult, result, bgResult);
        return;
    }

    var moneyBill = getMoneyBill(typeCustomer);
    var moneyService = getMoneyService(typeCustomer, connectNumber);
    var moneyCable = getMoneyCable(typeCustomer,cableNumber);

    var money = moneyBill + moneyService + moneyCable;

    result = `Tiền cấp của mã ${codeCustomer} là ${getFormatUSD(money)}`;
    bgResult = 'bg-success';

    printData(idResult, result, bgResult);
}

document.getElementById('hanldeCableMoney').onclick = function() {
    hanldeCableMoney();
}