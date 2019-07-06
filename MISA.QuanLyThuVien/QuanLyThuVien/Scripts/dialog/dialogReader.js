// Khởi tạo một con trỏ global
var context;
class DialogReader {
    constructor(element, width, height, title, scope, button) {
        this.DialogIndex = $(element).dialog({
            height: height,
            width: width,
            autoOpen: false,
            title: title,
            buttons: button ? button : [],
            resizable: false,
            modal: true,
            beforeClose: function () {
                // Xóa dữ liệu trên dialog trước khi đóng 
                $("#dlgRegistrationReader input[name], #dlgRegistrationReader select[name]").val("");
            }
        });
         // context = this;
    }
 
    // =============== Các hàm thực thi chức năng của dialog ===================
    // Hàm thực hiện chức năng đóng dialog
    closeDialog() {
        this.DialogIndex.dialog('close');
    }
    // Hàm thực hiện chức năng mở dialog
    openDialog() {
        this.DialogIndex.dialog("open");
        $('.required').removeClass('border-red');
    }
}