//Biến lưu dữ liệu từ server
var dataFromServer;
$(document).ready(function () {

})

class SupplierJS {
    //Hàm khởi tạo
    //Created by BQLINH (5/5/2019)
    constructor() {
        //Lấy dữ liệu từ server
        this.getData();
        //Xử lý xự kiện
        this.initEvents();
        //Tạo phím tắt
        this.createShortcutKey();
        //Dialog cung cấp
        this.dlgSupplierDetail = new Dialog('.dlgSupplierDetail', 422, 263, this);
        //Dialog xóa
        this.dlgSupplierDelete = new Dialog('.dlgSupplierDelete', 380, 130, this);
        //this.dlgResgisterReader = new Dialog('.dlgResgisterReader', 800, 340, "Đăng ký bạn đọc",this);
    }

    // Xử lý sự kiện
    // Created by BQLINH (5/5/2019)
    initEvents() {
        //Khi click vào các button trên thanh toolbar
        this.setClickButtonToolBarSuppliers();
        //Khi click vào các button trên dialog thêm hay dialog sửa
        this.setClickButtonOnAddOrEditDialog();
        //Khi click vào các button trên dialog xóa
        this.setClickButtonDialogDelete();
        //Khi click vào checkbox trên các Dialog
        this.setEventClickCheckboxOnDialog();
        //Khi nháy dúp vào một hàng dữ liệu
        this.setEventDoubleClickRowData();
        //Khi click vào một hàng dữ liệu
        this.setEventClickRowData();
        //Sự kiện ẩn hiện các phần tử của trang
        this.setEventShowHide();
        //Khi click vào tên cột
        this.setEventClickColumnTitle();
        //Các sự kiện trên các menu filter ẩn
        this.setEventOnHideFilterOption();
        //Một số event cho phần dưới cùng của bảng dữ liệu
        this.setEventForGridFooter();
        //Validate cho các dialog
        this.setValidateDialog();
        //Tab index
        this.setTabIndex();
        //Các sự kiện mặc định
        this.setEventDefault();

        //context menu
        $('.grid').on('contextMenu', function (event) {
            event.preventDefault();
            var x = event.clientX;
            var y = event.clientY;
            $('#contextMenu').css({ 'top': y, 'left': x });
            $('#contextMenu').show();
        });
    }

    //Hàm load dữ liệu 
    //Created by BQLINH (5/5/2019)
    loadData() {
        //Xóa những hàng đã có
        $('.grid-view .data-item-row').remove();
        var data = dataFromServer;
        var scope;
        //var filterObjects = [];
        //Lấy các giá trị trong input filter
        //var inputFilters = $('.filter-input > input');
        //$.each(inputFilters, function (index, item) {
        //    //Lấy điều kiện
        //    var type = $(item).attr('filterType');
        //    //Lấy tên 
        //    var fieldName = $(item).attr('fieldData')
        //    //Lấy giá trị
        //    var filterValue = $(item).val();
        //    var filterObject = {
        //        FilterType: type,
        //        Value: filterValue,
        //        FieldName: fieldName
        //    }
        //    filterObjects.push(filterObject);
        //});

        //Build table hiển hị dữ liệu
        $.each(data, function (index, supplier) {
            supplier.ID = index + 1;
            $(".row-grid-clone span[fieldData]").each(function () {
                var fieldName = $(this).attr("fieldData");
                //Kiểm tra ô checkbox
                if ($(this).children().length > 0) {
                    if (supplier[fieldName]) {
                        $(this).children('img').addClass('checkbox-true');
                    }
                    else {
                        $(this).children('img').removeClass('checkbox-true');
                    }
                } else {
                    $(this).text(supplier[fieldName]);
                }
                scope = $(this);
            });
            if ($(this) != null) {
                scope.parent().parent().data("SupplierID", supplier["SupplierID"]);
            }
            $('.grid-view').append($(".row-grid-clone .data-item-row").clone(true));
        });
        //Highlight dòng dầu
        this.firstRowSelected();
        //Disable nút sửa và xóa nếu không có dữ liệu
        this.disableEditDeleteButton();
        //Số lượng nhà cung cấp đang hiện
        var numberOfCurrentRecord = $('.grid-view .data-item-row').length;
        //Số lượng nhà cung cấp
        var numberOfTotalRecord = dataFromServer.length;
        $('.grid-footer-right > span').text('Hiển thị 1 - ' + numberOfCurrentRecord + ' trên ' + numberOfTotalRecord + ' kêt quả');
    }

    //Created by BQLINH (20/5/2019)
    getData() {
        $('.loading').show();
        $.ajax({
            method: "GET",
            url: "/suppliers",
            //async: true,
            success: function (response) {
                if (response.Success == false) {
                    alert(response.Message);
                } else {
                    //Ẩn màn hình loading
                    $('.loading').hide();
                    dataFromServer = response.Data;
                    //Sắp xếp theo tên lúc bắt đầu
                    dataFromServer.sort(dynamicSort('SupplierName'));
                    //Load dữ liệu
                    supplierJS.loadData();
                }
            },
            error: function () {
                alert("Error!");
            }
        });

    }

    // Hàm dùng để gọi api lọc dữ liệu
    // Created by BQLINH (30/5/2019)
    //getDataFilter(filterObject) {
    //    // Gọi ajax post dữ liệu lên server
    //    $.ajax({
    //        method: "Post",
    //        url: "/suppiers/getDataFilter",
    //        data: JSON.stringify(filterObject),
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (response) {
    //            if (response.Success == false) {
    //                alert(response.Message);
    //            } else {

    //            }
    //        },
    //        error: function (response) {
    //            alert(response.Message);
    //        }
    //    });
    //}

    //Hàm lưu dữ liệu trên server
    //Created by BQLINH (23/5/2019)
    save(url, supplier) {
        $('.grid-view .data-item-row').remove();
        $('.loading').show();
        $.ajax({
            method: "POST",
            url: url,
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(supplier),
            success: function (response) {
                if (response.Success == false) {
                    alert(response.Message);
                }
                else {
                    $('.loading').hide();
                    supplierJS.getData();
                    //Nêu là thêm mới thì sắp xếp theo tên
                    //if (state == "create") dataFromServer.sort(dynamicSort('SupplierName'));
                    //supplierJS.loadData();
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });

    }

    //Hàm xóa dữ liệu trên server bởi id
    //Created by BQLINH (25/5/2019)
    delete(supplierID) {
        $.ajax({
            method: "POST",
            url: "/suppliers/delete/" + supplierID,
            contentType: "application/json;charset=UTF-8",
            success: function (response) {
                if (response.Success == false) {
                    alert(response.Message);
                }
                else {
                    //Xóa nhà cung cấp trong mảng dataFromSerVer
                    for (var i = 0; i < dataFromServer.length; i++) {
                        if (dataFromServer[i].SupplierID == supplierID) {
                            dataFromServer.splice(i, 1);
                        }
                    }

                    //Thay số thứ tự hàng dữ liệu trên giao diện khi xóa hàng
                    var indexOfRowSelected = parseInt($('.data-item-row.row-selected div:first-child').text());
                    $('.data-item-1 span').each(function () {
                        if (parseInt($(this).text()) > indexOfRowSelected) {
                            let newindex = $(this).text() - 1;
                            $(this).text(newindex);
                        }
                    });
                    $('.row-selected').remove();
                    supplierJS.firstRowSelected();
                    supplierJS.disableEditDeleteButton();
                    supplierJS.dlgSupplierDelete.closeDialog();
                    //Số lượng nhà cung cấp
                    var numberOfTotalSuppliers = dataFromServer.length;
                    //Số lượng nhà cung cấp đang hiện
                    var numberOfCurrentSuppliers = $('.data-item-row').length - 1;
                    $('.grid-footer-right > span').text('Hiển thị 1 - ' + numberOfCurrentSuppliers + ' trên ' + numberOfTotalSuppliers + ' kêt quả');
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });
    }

    //Hàm xóa tất cả dữ liệu trên server
    //Created by BQLINH (25/5/2019)
    deleteAll() {
        $.ajax({
            method: "POST",
            url: "/suppliers/delete",
            contentType: "application/json;charset=UTF-8",
            success: function (response) {
                if (response.Success == false) {
                    alert(response.Message);
                }
                else {
                    dataFromServer.splice(0, dataFromServer.length);
                    $('.row-selected').remove();
                    supplierJS.firstRowSelected();
                    supplierJS.disableEditDeleteButton();
                    supplierJS.dlgSupplierDelete.closeDialog();
                    //Số lượng nhà cung cấp đang hiện
                    var numberOfCurrentSuppliers = $('.data-item-row').length - 1;
                    //Số lượng nhà cung cấp
                    var numberOfTotalSuppliers = dataFromServer.length;
                    $('.grid-footer-right > span').text('Không có kết quả nào');
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });
    }

    

    //Hàm xử lý validate 
    //Created by BQLINH (30/5/2019)
    setValidateDialog() {
        //Xử lý sự kiện khi blur ra khỏi ô nhập liệu
        $('.required').blur(validate.requiredInputBlur);
        //Viết hoa chữ cái đầu tiên và cắt khoảng trắng
        $('.dlgSupplierDetail input, textarea').keypress(function () {
            var inputValue = $(this).val();
            inputValue = validate.convertStringToStandard(inputValue);
            $(this).val(inputValue);
        });
    }

    // Các sự kiện mặc định khi vào trang web
    // Created by BQLINH (28/5/2019)
    setEventDefault() {
        // Khi focus vào ô nhập liệu thì select all
        $("input[type=text], textarea").on("focus", function () {
            $(this).select();
        });
        // Nếu focus vào input, textarea thì viền màu hiện lên
        $("input, textarea").focus(function () {
            $(this).css("border-color", "#A6C8FF");
        });
        // Nếu blur vào input, textarea thì viền màu xám hiện lên
        $("input, textarea").blur(function () {
            $(this).css("border-color", "rgb(197, 195, 195)");
        });
    }

    // Hàm xử lý khi click vào các button trên thanh toolbar
    // Created by BQLINH (28/5/2019)
    setClickButtonToolBarSuppliers() {
        // Nếu bấm vào icon thêm mới
        $('#btnAdd').click(this.btnAddClick);
        // Nếu bấm vào icon sửa
        $('#btnEdit').click(this.btnEditClick);
        // Nếu bấm vào icon xóa
        $('#btnDelete').click(this.btnDeleteClick);
        // Nếu bấm vào icon nạp
        $('#btnRefresh').click(this.btnRefreshClick);
        // Nếu bấm vào icon giúp
        $('#btnHelp').click(this.btnHelpClick);
    }

    // Hàm xử lý khi click vào các button trên dialog thêm hoặc sửa
    // Created by BQLINH (28/5/2019)
    setClickButtonOnAddOrEditDialog() {
        $('#btnSave').click(this.btnSaveClick);
        $('#btnCancel').click(this.btnCancelClick);
    }

    // Hàm xử lý khi click vào các button trên dialog xóa
    // Created by BQLINH (28/5/2019)
    setClickButtonDialogDelete() {
        $('#btnYes').click(this.btnYesClick);
        $('#btnNo').click(this.btnNoClick);
    }

    // Hàm xử lý khi click vào checkbox trên dialog
    // Created by BQLINH (28/5/2019)
    setEventClickCheckboxOnDialog() {
        $('#chkUse').click(this.chkUseClick);
    }


    // Hàm nháy đúp chuột vào một hàng dữ liệu
    // Created by BQLINH (23/5/2019)
    setEventDoubleClickRowData() {
        $('.data-item-row').dblclick(function () {
            supplierJS.btnEditClick();
        })
    }

    // Hàm xử lý highlight dòng dữ liệu được click vào và nêu nhấn dữ ctrl rồi click thì chọn được nhiều hàng
    // Created by BQLINH (28/5/2019)
    setEventClickRowData() {
        $("body").on("click", ".data-item-row", function (event) {
            if (event.ctrlKey) {
                if ($(this).hasClass('row-selected')) {
                    $(this).removeClass("row-selected");
                } else {
                    $(this).addClass("row-selected");
                }
            } else {
                $(".row-selected").removeClass("row-selected");
                $(this).addClass("row-selected");
            }
        });
    }

    // Thiết lập các sự kiện ẩn hiện cho các phần tử
    // Created by BQLINH (28/5/2019)
    setEventShowHide() {
        //Xử lý sự kiện click vào nút đổi trang nghiệp vụ
        $(".select-list-header").click(function () {
            $(".list-menu-header").slideToggle();
        });

        //Xử lý click filter-option
        $('.filter-option').click(function () {
            $('.hide-on-click').hide();
            event.stopPropagation();
            $(this).children(':last').toggle();
        });

        //Xử lý click vào icon chọn số bản ghi hiển thị
        $('.icon-selection').click(function () {
            $('.select-record').toggle();
        });
    }

    // Thiết lập sự kiện khi click vào các column header
    // Created by BQLINH (28/5/2019)
    setEventClickColumnTitle() {
        $('.column-title').click(this.sortDataByColumnTitle);
    }

    //Hàm xử lý chức năng tab trên dialog
    //Created by BQLINH (15/5/2019)
    setTabIndex() {
        //Tab
        $('#focusguard').keyup(function (e) {
            if (e.keyCode == 9) $("#txtSupplierCode").focus();
        });
        //Shift tab
        $('#txtSupplierCode').keydown(function (e) {
            if (e.shiftKey && e.keyCode == 9) $("#focusguard").focus();
        });
    }

    
    //Hàm xử lý chức năng tab trên dialog
    //Created by BQLINH (15/5/2019)
    setEventOnHideFilterOption() {
        //Xử lý thay đổi filter-option
        $('.hide-filter-option > div.condition').click(function () {
            var filterType = $(this).children(".text-filter-option").text();
            $(this).parent().find('.point').css("visibility", "hidden");
            $(this).children(":first").css("visibility", "visible");
            $(this).parent().parent().next().children(':first').attr('filterType', filterType);
        });

        //Xử lý khi click vào xóa điều kiện lọc
        $('.delete-condition').click(function () {
            $(this).parent().find('.point').css("visibility", "hidden");
            $(this).next().children('.point').css("visibility", "visible");
            $(this).next().children('.point').css("visibility", "visible");
            $(this).parent().parent().next().children(':first').attr('filterType', 'Chứa');
        });
    }

    //Hàm xử lý chức năng lưu trên dialog
    //Created by BQLINH (7/5/2019)
    btnSaveClick() {
        //Validate dữ liệu
        if (validate.validateInput()) {
            //Lấy dữ liệu trên form, build thành object:
            var listElements = $('[dataIndex]');
            var supplier = {};
            $.each(listElements, function (index, element) {
                var fieldName = $(element).attr('dataIndex');
                var fieldValue;
                if (fieldName == "Use") {
                    if ($(element).hasClass('checkbox-true'))
                        fieldValue = "true";
                    else
                        fieldValue = "false";
                } else {
                    fieldValue = $(element).val().trim();
                }
                supplier[fieldName] = fieldValue;
            });
            //Gọi api thêm nếu biến state ="create", goi sửa nếu là "edit"
            if (state == "create") {
                supplierJS.save('/suppliers/new', supplier);
            }
            else if (state == "edit") {
                supplierJS.save('/suppliers/edit', supplier);
            }
            //Đóng dialog
            supplierJS.dlgSupplierDetail.closeDialog();
        } else {
            //alert("Vui lòng điền đầy đủ dữ liệu");
            //$('.border-red').attr('title', 'Dữ liệu không được để trống!');
        }
    }

    //Hàm xử lý chức năng hủy trên dialog
    //Created by BQLINH (15/5/2019)
    btnCancelClick() {
        supplierJS.dlgSupplierDetail.closeDialog();
    }

    //Hàm xử lý chức năng check sử dụng trên dialog
    //Created by BQLINH (15/5/2019)
    chkUseClick() {
        if ($('#chkUse img').hasClass('checkbox-true')) {
            $('#chkUse img').removeClass('checkbox-true');
        } else {
            $('#chkUse img').addClass('checkbox-true');
        }
    }

    //Hàm xử lý nhấn click yes trên dialog xóa
    //Created by BQLINH (20/5/2019)
    btnYesClick() {
        //Lấy ID của bản ghi
        var rowSelected = $(".row-selected");
        var supplierID = rowSelected.data().SupplierID;
        //Xóa bản ghi
        if (rowSelected.length == 1) {
            supplierJS.delete(supplierID);
        }
        else {
            supplierJS.deleteAll();
        }

    };

    //Hàm xử lý nhấn click no trên dialog xóa
    //Created by BQLINH (20/5/2019)
    btnNoClick() {
        supplierJS.dlgSupplierDelete.closeDialog();
    }

    //Hàm tạo phím tắt
    //Created by BQLINH (15/5/2019)
    createShortcutKey() {
        window.onkeydown = function (event) {

            //Ctrl + Alt+ N mở dialog thêm
            if (event.ctrlKey && event.altKey && event.keyCode == 78) {
                supplierJS.btnAddClick();
            }
            //Ctrl + E mở dialog sửa
            if (event.ctrlKey && event.keyCode == 69) {
                supplierJS.btnEditClick();
                event.preventDefault();
            }
            //Ctrl + D xóa
            if (event.ctrlKey && event.keyCode == 68) {
                supplierJS.btnDeleteClick();
                event.preventDefault();
            }

            //Ctrl + R nạp  
            if (event.ctrlKey && event.keyCode == 82) {
                supplierJS.btnRefreshClick();
                event.preventDefault();
            }

            //Ctrl + H giúp
            if (event.ctrlKey && event.keyCode == 72) {
                supplierJS.btnHelpClick();
                event.preventDefault();
            }

            //Ctrl + S lưu
            if (event.ctrlKey && event.keyCode == 83) {
                supplierJS.btnSaveClick();
                event.preventDefault();
            }

            //Ctrl + Q hủy 
            if (event.ctrlKey && event.keyCode == 81) {
                supplierJS.btnCancelClick();
                event.preventDefault();
            }

            //Ctrl + F8 click vào "Có"
            if (event.ctrlKey && event.keyCode == 119) {
                supplierJS.btnYesClick();
                event.preventDefault();
            }

            //Ctrl + F9 click vào "Không"
            if (event.ctrlKey && event.keyCode == 120) {
                supplierJS.btnNoClick();
                event.preventDefault();
            }

            //Ctrl + A chọn tất cả
            if (event.ctrlKey && event.keyCode == 65) {
                //alert('Chọn tất');
                $('.data-item-row').removeClass('row-selected');
                $('.data-item-row').addClass('row-selected');
                event.preventDefault();
            }

            var rowFocus = $('.row-selected');

            //Di chuyển lên hàng trên
            if (event.keyCode == 38) {
                var rowFocus = $('.row-selected').prev();
                if (rowFocus.hasClass('data-item-row')) {
                    $('.grid-view .row-selected').removeClass('row-selected');
                    rowFocus.addClass('row-selected');
                }
                event.preventDefault();
            }

            //Di chuyển xuống hàng dưới
            if (event.keyCode == 40) {
                var rowFocus = $('.row-selected').next();
                if (rowFocus.hasClass('data-item-row')) {
                    $('.grid-view .row-selected').removeClass('row-selected');
                    rowFocus.addClass('row-selected');
                }
                event.preventDefault();
            }
        }
    }


    // Xử lý khi click vào nút thêm
    // Created by BQLINH (5/5/2019)
    btnAddClick() {
        state = "create";
        //alert("Bạn vừa click vào nút thêm!");
        supplierJS.dlgSupplierDetail.openDialog();
        supplierJS.dlgSupplierDetail.optionDialog("title", "Thêm nhà cung cấp");
        // Ẩn checkbox
        $("#chkUse").addClass('none-display');
        // Thêm giá trị vào ô đầu tiên
        $("#txtSupplierCode").val("NCC00001");
    }

    // Xử lý khi click vào nút sửa
    // Created by BQLINH (5/5/2019)
    btnEditClick() {
        state = "edit";
        //alert("Bạn vừa click vào nút sửa!");
        supplierJS.dlgSupplierDetail.openDialog();
        supplierJS.dlgSupplierDetail.optionDialog("title", "Sửa nhà cung cấp");
        // Hiện checkbox
        $("#chkUse").removeClass('none-display');
        var data = [];
        // Lấy ID của bản ghi
        var rowSelected = $(".row-selected");
        var supplierID = rowSelected.data().SupplierID;
        data.push(supplierID);
        // Lấy giá trị tử hàng được chọn
        var dataCell;
        $('.row-selected span').each(function () {
            dataCell = $(this).text();
            data.push(dataCell);
        });
        //Truyền dữ liệu vào form
        $('.dlgSupplierDetail #txtSupplierID').val(data[0]);
        $('.dlgSupplierDetail #txtSupplierCode').val(data[2]);
        $('.dlgSupplierDetail #txtSupplierName').val(data[3]);
        $('.dlgSupplierDetail #txtAddress').val(data[4]);
        $('.dlgSupplierDetail #txtTaxCode').val(data[5]);
        $('.dlgSupplierDetail #txtNote').val(data[6]);

        //Kiểm tra xem checkbox true hay false, nếu có class check-true thì checkbox đang tích, nếu không có thì không tích
        var isCheck = $('.row-selected img').hasClass('checkbox-true');
        if (isCheck) {
            $('#chkUse img').addClass('checkbox-true');
        }
        else {
            $('#chkUse img').removeClass('checkbox-true');
        }
    }


    //Khu vực xử lý sự kiện trên thanh toolbar

    // Xử lý khi click vào nút xóa
    // Created by BQLINH (5/5/2019)
    btnDeleteClick() {
        //alert("Bạn vừa click vào nút xóa!");
        supplierJS.dlgSupplierDelete.openDialog();
        supplierJS.dlgSupplierDelete.optionDialog("title", "QLTH.VN");
        //Khi xóa nhiều nhà cung cấp một lúc
        if ($('.row-selected').length > 2) {
            supplierJS.dlgSupplierDelete.optionDialog("width", "420");
            $('.dlgSupplierDelete .supplierTitle').text('những Nhà cung cấp');
        }
    }

    // Xử lý khi click vào nút nạp
    // Created by BQLINH (5/5/2019)
    btnRefreshClick() {
        //alert("Bạn vừa click vào nút nạp!");
        $('.grid-view .data-item-row').remove();
        supplierJS.getData();
    }

    // Xử lý khi click vào nút giúp
    // Created by BQLINH (5/5/2019)
    btnHelpClick() {
        alert("Bạn vừa click vào nút giúp!");
        //window.open('http://help.qlth.vn/tv_nha_cung_cap.htm');
    }

    //Xử lý disable khi grid không có dữ liệu
    //Created by BQLINH (10/5/2019)
    disableEditDeleteButton() {
        if ($('.grid-view').children('.data-item-row').length == 0) {
            $('#btnEdit,#btnDelete').addClass('disabled-button');
            $('.grid-view .data-item-row').remove();
            //$('.grid-view').append('<div class="grid-empty"> Không có nhà cung cấp nào.</div >');
        }
    }

    //Khu vực xử lý sự kiện trên grid 

    //Xử lý khi click vào header grid
    //Created by BQLINH (10/5/2019)
    sortDataByColumnTitle() {
        var stateSort = $(this).attr("state");
        var title = $(this).parent().attr('fieldData');
        var numberOfSuppliers = dataFromServer.length;
        switch (stateSort) {
            case "normal":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).children(':first-child').addClass('grid-arrow-up');
                $(this).attr('state', 'arrow up');
                //Nếu tiêu đề là mã nhà cung cấp thì parseInt mã code chỉ lấy phần số
                if (title == "SupplierCode") {
                    for (var i = 0; i < numberOfSuppliers; i++) {
                        dataFromServer[i].SupplierCode = parseInt(dataFromServer[i].SupplierCode.substr(3));
                    }
                }
                dataFromServer.sort(dynamicSort(title));
                //Nếu tiêu đề là mã nhà cung cấp thì cộng vào mã code thêm chuỗi "NCC00"
                if (title == "SupplierCode") {
                    for (var i = 0; i < numberOfSuppliers; i++) {
                        dataFromServer[i].SupplierCode = "NCC00" + dataFromServer[i].SupplierCode;
                    }
                }
                $('.grid-view .data-item-row').remove();
                supplierJS.loadData();
                break;
            case "arrow up":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).children(':first-child').addClass('grid-arrow-down');
                $(this).attr('state', 'arrow down');
                //Nếu tiêu đề là mã nhà cung cấp thì parseInt mã code chỉ lấy phần số
                if (title == "SupplierCode") {
                    for (var i = 0; i < numberOfSuppliers; i++) {
                        dataFromServer[i].SupplierCode = parseInt(dataFromServer[i].SupplierCode.substr(3));
                    }
                }
                title = "-" + title;
                dataFromServer.sort(dynamicSort(title));
                //Nếu tiêu đề là mã nhà cung cấp thì cộng vào mã code thêm chuỗi "NCC00"
                if (title == "-SupplierCode") {
                    for (var i = 0; i < numberOfSuppliers; i++) {
                        dataFromServer[i].SupplierCode = "NCC00" + dataFromServer[i].SupplierCode;
                    }
                }
                $('.grid-view .data-item-row').remove();
                supplierJS.loadData();
                break;
            case "arrow down":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).attr('state', 'normal');
                if (title == "SupplierCode") title = parseInt(title.substr(3));
                dataFromServer.sort(dynamicSort('SupplierName'));
                $('.grid-view .data-item-row').remove();
                supplierJS.loadData();
                break;
            default: break;
        }
    }



    //Hàm highlight vào hàng đầu tiên của bảng dữ liệu
    //Created by BQLINH (10/5/2019)
    firstRowSelected() {
        //$('.data-item-1').first().addClass("row-selected");
        $('.data-item-row').first().addClass("row-selected");
    }

    //Hàm xử lý các sự kiện dưới grid footer
    //Created by BQLINH (10/5/2019)
    setEventForGridFooter() {
        //Xử lý sự kiện thay đổi background cho số lượng các bản ghi trên selection khi click
        $('.select-record > div').click(function () {
            $('.select-record > div').css("background-color", "white");
            $(this).css("background-color", "#b3d7ff");
            var recordDisplay = $(this).text();
            $('.number-display-record > input').val(recordDisplay);

        });
    }
}

//Tạo đối tượng Validate
validate = new Validate();

//Khởi tạo một đối tượng nhà cung cấp
var supplierJS = new SupplierJS();

//Biến xem dialog loại nào
var state;

//Ẩn đối tượng khi click ra ngoài đối tượng
//Created by BQLINH(15/5/2019)
$(document).on('click', function (event) {
    if (!$(event.target).hasClass('hide-on-click') && !$(event.target).hasClass('toggle-btn'))
        $('.hide-on-click').hide();
})
//Lưu khi bấm enter khi đang focus vào nút save 
//Created by BQLINH(20/5/2019)
$('#btnSave').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        supplierJS.btnSaveClick();
    }
});
//Hủy khi bấm enter khi đang focus vào nút hủy 
//Created by BQLINH(20/5/2019)
$('#btnCancel').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        supplierJS.btnCancelClick();
    }
});
//Thay đổi trạng thái check box sử dụng khi nhấn space
//Created by BQLINH(20/5/2019)
$('#chkUse').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '32') {
        supplierJS.chkUseClick();
    }
});
//Lọc khi bấm enter khi đang focus vào filter input
//Created by BQLINH(20/5/2019)
$('.filter-input > input').keydown(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        alert("Lọc");
        $('.grid-view .data-item-row').remove();
        supplierJS.loadData();
    }
});
//Hàm sắp xếp động theo thuộc tính
//Created by BQLINH(20/5/2019)
function dynamicSort(property) {
    //Sắp xếp từ bé đến lớn
    var sortOrder = 1;
    //Nếu phía trước thuộc tính có dấu trừ thì chiều sắp xếp sẽ là từ lớn đến bé
    if (property[0] === "-") {
        //Sắp xếp từ lớn đến bé
        sortOrder = -1;
        //Lấy thuộc tính
        property = property.substr(1);
    }
    //Overide hàm sort
    return function (a, b) {
        //Nếu trước nhỏ hơn sau thì trả về -1, lớn hơn sau thì trả về 1, bằng nhau trả về 0 
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}