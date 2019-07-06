var textObj;
$(document).ready(function () {
    categorysymbol.rowSelected();

    //Tạo đối tượng Validate
    //Created by BQLINH (9/5/2019)
    validate = new Validate();

    //Tạo hover cho filter-option
    //DQTuan 13/05/2019
    $(".filter-option").click(function () {
        event.stopPropagation();
        $(this).find(".hide-filter-option").toggle();

    });
    $("body").click(function () {
        $(".hide-filter-option").hide();
    })

    //Tạo point cho bảng filter-option
    //DQTuan 13/05/2019
    $(".hide-filter-selection").click(function () {
        $(this).parent().find(".hide-filter-selection-chose").removeClass("hide-filter-selection-chose");
        $(this).find(".point").addClass("hide-filter-selection-chose");
    });

});
var formCategorySymbol;
class CategorySymbolJS {
    constructor() {
        this.firstRowSelected();
        this.loadDataCatagorySymbol();
        textObj = this;
        this.initEventsCategorySymbol();
        formCategorySymbol = new dialogCategorySymbol("#formCategorySymbol", 340, 205, this);
    }

    //Hàm highlight vào hàng đầu tiên của bảng dữ liệu
    //Created by BQLINH (9/5/2019)
    firstRowSelected() {
        $('.data-item-1').first().addClass("row-selected");
        $('.data-item-row').first().addClass("row-selected");
    }

    //Hàm highlight vào hàng được chọn của bảng dữ liệu
    //Created by BQLINH (9/5/2019)
    rowSelected() {
        $('.grid-view').on("click", ".data-item-row", function () {
            $('.row-selected').removeClass("row-selected");
            $(this).addClass("row-selected");
            $(this).find('.data-item-1').addClass("row-selected");
        });
    }

    //Các hàm này dùng để tạo action cho button
    // Created by: NDTRUONG (05/05/2019)

    initEventsCategorySymbol() {

        //xử lý action button trong trang ký hiệu phân loại

        $('body').on('click', '#btnAddCategorySymbol', this.btnAddCategorySymbolOnClick);
        $('body').on('click', '#btnEditCategorySymbol', this.btnEditCategorySymbolOnClick);
        $('body').on('click', '#btnRefreshCategorySymbol', this.btnRefreshCategorySymbol);
        $('body').on('click', '#btnDeleteCategorySymbol', this.btnDeleteCategorySymbolOnClick);
        $('body').on('click', '#btnUsingCategorySymbol', this.btnUsingCategorySymbolOnClick);
        $('body').on('click', '#btnStopUsingCategorySymbol', this.btnStopUsingCategorySymbolOnClick);
        $('body').on('click', '#btnImportCategorySymbol', this.btnImportCategorySymbolOnClick);
        $('body').on('click', '#btnHelpCategorySymbol', this.btnHelpCategorySymbolOnClick);
        $('body').on('click', '#feedbackCategorySymbol', this.btnFeedbackCategorySymbol);

    }
    //create by NDTRUONG( 09/05/2019 )
    //Load dữ liệu trang
    loadDataCatagorySymbol() {
    }

    // create by NDTRUONG (08/05/2019)
    // xử lý button trong trang ký hiệu phân loại
    btnAddCategorySymbolOnClick() {
        $('.formCategorySymbolID  input').removeClass('border-red');
        $("span#ui-id-1").text("Thêm ký hiệu PL chuẩn Thư viện quốc gia");
        formCategorySymbol.openDialog();
    }
    btnEditCategorySymbolOnClick() {
        $('.formCategorySymbolID  input').removeClass('border-red');
        $("span#ui-id-1").text("Sửa ký hiệu PL chuẩn Thư viện quốc gia");
        formCategorySymbol.openDialog();
    }
    btnRefreshCategorySymbol() {
        location.reload();
    }
    btnDeleteCategorySymbolOnClick() {
        alert('Bạn vừa nhấn xóa bản ghi đang chọn');
        $('.row-selected').remove();
    }
    btnUsingCategorySymbolOnClick() {
        alert('bạn vừa nhấn sử dụng ký hiệu phân loại');
        $('#btnUsingCategorySymbol').attr("disabled", "disabled");
    }
    btnStopUsingCategorySymbolOnClick() {
        alert('Bạn vừa nhấn ngừng sử dụng ký hiệu phân loại');
    }
    btnImportCategorySymbolOnClick() {
        alert('Bạn vừa nhấn nhập khẩu');
    }
    btnHelpCategorySymbolOnClick() {
        alert('Bạn vừa nhấn tìm sự trợ giúp');
    }

    btnFeedbackCategorySymbol() {
        alert('Bạn vừa nhấn phản hồi');
    }
    //xử lý button save trong dialog ký hiệu phân loại
    btnSaveCategorySymbolClick() {
        
        if (validate.validateInput()) {
            alert('Cất thành công');
            formCategorySymbol.closeDialog();
        } else {
            alert("Vui lòng điền đầy đủ dữ liệu");
        }
        
    }

    cancel() {
        alert('Đóng dialog');
        formCategorySymbol.closeDialog();
    }

}

var categorysymbol = new CategorySymbolJS();

//Hiện Menu chọn chức năng header
//DQTuan 05-/05/2019
$(".select-list-header").click(function () {
    $(".list-menu-header").slideToggle();
});

