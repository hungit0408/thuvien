//Class dialog 
//Created by BQLINH (5/5/2019)
class Dialog {
    //Hàm khởi tạo
    //Tham số (element, width, height , scope) : (phần tử, độ rộng phần tử, độ cao phần tử,biến phạm vi)
    //Created by BQLINH (5/5/2019)
    constructor(element, width, height, scope) {
        this.dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            resizable: false,
            modal: true,
            //buttons: [
            //    {
            //        text: "Cất",
            //        id: "btnSave",
            //        click: scope ? scope.btnSaveClick : this.save
            //    },
            //    {
            //        text: "Hủy bỏ",
            //        id: "btnCancel",
            //        click: this.closeDialog
            //    }
            //]
        });
    }

    //Hàm  build option dialog
    //Created by BQLINH (8/5/2019)
    optionDialog(optionName, value) {
        this.dialog.dialog("option", optionName, value);
        $('input#txtSupplierCode').select();
    }

    //Hàm mở dialog
    //Created by BQLINH (6/5/2019)
    openDialog() {
        this.dialog.dialog("open");
        $('.dlgSupplierDetail input').val('');
        $('.dlgSupplierDetail textarea').val('');
        $('.required').removeClass('border-red');
        $('.required').removeAttr('title');
        $('input#txtSupplierCode').select();
    }

    //Hàm đóng dialog
    // Created by BQLINH(6/5/2019)
    closeDialog() {
        this.dialog.dialog('close');
    }

    //Hàm xử lý khi bấm cất trên dialog
    //Created by BQLINH (6/5/2019)
    save() {
        alert('Lưu');
    }

    //Hàm xử lý khi bấm giúp trên dialog
    //Created by BQLINH (6/5/2019)
    help() {
        alert('Giúp');
    }
}
var dialogJS = new Dialog();