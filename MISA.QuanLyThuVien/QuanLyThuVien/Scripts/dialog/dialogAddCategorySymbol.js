// khởi tạo class dialogForm
// Created by: NDTRUONG (08/05/2019)
var context;
class dialogCategorySymbol {
    constructor(element, width, height, scope) {
        context = this;
        this.Dialog = $(element).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
            buttons: [{
                text: 'Cất',
                click: function () {
                    scope.btnSaveCategorySymbolClick();
                },
                class: 'btnSaveCategoryDialog',
                id: 'btnSaveCategoryDialogID'
            }, {
                text: 'Hủy bỏ',
                click: function () {
                    scope.cancel();
                },
                    class: 'btnCancelCategoryDialog',
                    id: 'btnCancelCategoryDialogID'
            }]
        });
    }

    // Hàm này dùng để mở/đóng dialog
    // Created by: NDTRUONG (08/05/2019)

    openDialog() {
        context.Dialog.dialog('open');
    }
    closeDialog() {
        context.Dialog.dialog('close');
    }
}
