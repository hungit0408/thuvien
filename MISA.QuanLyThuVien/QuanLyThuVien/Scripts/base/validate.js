//Class Validate Data
//Created by BQLINH (9/5/2019)
class Validate {

    //Constructor
    //Created by BQLINH (9/5/2019)
    constructor() {
        this.validateInput();
    };

    //Validate form
    //Created by BQLINH (9/5/2019)
    validateInput() {
        debugger
        var flag = true;
        var i = 0;
        $('.required').each(function () {
            if ($(this).val() === '') {
                $(this).addClass('border-red');
                $(this).attr('title', 'Dữ liệu không được để trống!');
                if (i === 0) {
                    $(this).focus();
                }
                i++;
                flag = false;
            }
        });
        var BithDate = $("#txtBirthday").val();
        
        return flag;
    }

    //Xử lý sự kiện khi blur ra khỏi ô nhập liệu
    //Created by BQLINH (15/5/2019)
    requiredInputBlur() {
        debugger;
        $('.required').blur(function () {
            if ($(this).val() === "") {
                $(this).addClass("border-red");
                $(this).attr('title', 'Dữ liệu không được để trống!');
            } else {
                $(this).removeClass("border-red");
                $(this).removeAttr('title');
            }
        });
    }

    //Đưa chuỗi về định dang
    //Created by BQLINH (30/5/2019)
    convertStringToStandard(string) {
        var result = string;
        result = result.replace(string[0], function (letter) {
            return letter.toUpperCase();
        });
        result = result.replace(/\s+/g, ' ');
        return result;
    }

    //  Validate ngày đúng định dạng
    ValidateDateTime() {
        $('#txtBirthday').blur(function () {
            var valueDate = $("#txtBirthday").val();
            var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            if (!(date_regex.test(valueDate))) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Ngày sai định dạng!');
                $("#txtBirthday").focus();
            } else {
                $(this).removeClass('border-red');
                $(this).attr('title','');
            }
        });

    }
   
}

