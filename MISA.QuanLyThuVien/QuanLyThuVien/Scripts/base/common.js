// Hàm format ngày tháng năm 
// NSON 13/5/2019
Date.prototype.formatddMMMyyyy = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return (day <= 9 ? '0' + day : day) + '/' + (month <= 9 ? '0' + month : month) + '/' + year;

}
// Hàm format tiền tệ 
// NVSON 13/5/2019
Number.prototype.formatMoney = function () {
    return this.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};