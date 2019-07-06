// Khởi tạo con trỏ
var obj;
class DialogState {
    constructor(element, width, height, title, content, kind) {
        this.dialogState = $(element).dialog({
            width: width,
            height: height,
            title: title,
            modal: true,
            resizable: false
        });
        this.content = content;
        this.kind = kind;
        obj = this;
    }
    openDialog() {
        this.dialogState.dialog("open");
        // Kiểm tra xem loại thông báo là thông báo gì
        // Nếu kind=true thì thông báo diaog cho phép xóa bản ghi và bind thông tin sau
        if (obj.kind === "allowdelete") {
            $("#dlgStateDelete .icon-state img").attr("src", "/Contents/icon/question32.png");
            $("#dlgStateDelete .content-state p").text(obj.content);

            $("#dlgStateDelete #btn-state-yes").attr("style", "display:flex");
            $("#dlgStateDelete #btn-state-no").attr("style", "display:flex");
            $("#dlgStateDelete #btn-state-agree").attr("style", "display:none");
        }
        // Nếu kind=false thì thông báo diaog không cho phép xóa bản ghi và bind thông tin sau
        if (obj.kind === "nodelete") {
            $("#dlgStateDelete .icon-state img").attr("src", "/Contents/icon/warning32.png");
            $("#dlgStateDelete .content-state p").text(obj.content);
            // Ẩn 2 button yes no và hiển thị button đồng ý
            $("#dlgStateDelete #btn-state-yes").attr("style", "display:none");
            $("#dlgStateDelete #btn-state-no").attr("style", "display:none");
            $("#dlgStateDelete #btn-state-agree").attr("style", "display:flex");
        }
        if (obj.kind === "duplicate") {
            $("#dlgStateDelete .icon-state img").attr("src", "/Contents/icon/warning32.png");
            $("#dlgStateDelete .content-state p").text(obj.content);
            // Ẩn 2 button yes no và hiển thị button đồng ý
            $("#dlgStateDelete #btn-state-yes").attr("style", "display:none");
            $("#dlgStateDelete #btn-state-no").attr("style", "display:none");
            $("#dlgStateDelete #btn-state-agree").attr("style", "display:flex");
        }
    }
    closeDialog() {
        this.dialogState.dialog("close");

    }
}