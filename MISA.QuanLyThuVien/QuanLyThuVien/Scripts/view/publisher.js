//Biến lưu dữ liệu từ server
var dataFromServer;
$(document).ready(function () {
    
})

class PublisherJS {
    //Hàm khởi tạo
    //Created by DXVUNG (5/5/2019)
    constructor() {
        //Lấy dữ liệu từ server
        this.getData();
        //Xử lý xự kiện
        this.initEvents();
        //Tạo phím tắt
        this.createShortcutKey();
        //Dialog nhà xuất bản
        this.dlgPublisherDetail = new Dialog('.dlgPublisherDetail', 422, "auto", this);
        //Dialog xóa
        this.dlgPublisherDelete = new Dialog('.dlgPublisherDelete', 380, "auto", this);
        //this.dlgResgisterReader = new Dialog('.dlgResgisterReader', 800, 340, "Đăng ký bạn đọc",this);
    }

    // Xử lý sự kiện
    // Created by DXVUNG (5/5/2019)
    initEvents() {
        //Khi click vào các button trên thanh toolbar
        this.setClickButtonToolBarPublishers();
        //Khi click vào các button trên dialog thêm hay dialog sửa
        this.setClickButtonOnAddOrEditDialog();
        //Khi click vào các button trên dialog xóa
        this.setClickButtonDialogDelete();
        //Khi click vào checkbox trên các Dialogf
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
        //Đặt validate cho các dialog 
        this.setValidateDialog();
        //Tab index
        this.setTabIndex();
        //Context menu
        this.setContextMenu();
        //Close Context Menu
        this.setCloseContextMenu();
        //Filter data
        this.setFilterData();
        //Các sự kiện mặc định
        this.setEventDefault();
    }

    //Hàm load dữ liệu 
    //Created by DXVUNG (5/5/2019)
    loadData(dataFromServer) {
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

        //Build table hiển thị dữ liệu
        $.each(data, function (index, publisher) {
            publisher.ID = index + 1;
            $(".row-grid-clone span[fieldData]").each(function () {
                var fieldName = $(this).attr("fieldData");
                //Kiểm tra ô checkbox
                if ($(this).children().length > 0) {
                    if (publisher[fieldName]) {
                        $(this).children('img').addClass('checkbox-true');
                    }
                    else {
                        $(this).children('img').removeClass('checkbox-true');
                    }
                } else {
                    $(this).text(publisher[fieldName]);
                }
                scope = $(this);
            });
            if ($(this) != null) {
                scope.parent().parent().data("PublisherID", publisher["PublisherID"]);
            }
            $('.grid-view').append($(".row-grid-clone .data-item-row").clone(true));
        });
        //Highlight dòng dầu
        this.firstRowSelected();
        //Disable nút sửa và xóa nếu không có dữ liệu
        this.disableEditDeleteButton();
        //Số lượng nhà xuất bản đang hiện
        var numberOfCurrentRecord = $('.grid-view .data-item-row').length;
        //Số lượng nhà xuất bản
        var numberOfTotalRecord = dataFromServer.length;
        $('.grid-footer-right > span').text('Hiển thị 1 - ' + numberOfCurrentRecord + ' trên ' + numberOfTotalRecord + ' kêt quả');
    }

    //Created by DXVUNG (20/5/2019)
    getData() {
        $('.loading').show();
        $.ajax({
            method: "GET",
            url: "/publishers/getlistPublisher",
            //async: true,
            success: function (response) {
                if (response.Success === false) {
                    alert(response.Message);
                } else {
                    //Ẩn màn hình loading
                    $('.loading').hide();
                    var dataFromServer = response.Data;
                    //Sắp xếp theo tên lúc bắt đầu
                    //dataFromServer.sort(dynamicSort('PublisherName'));
                    //Load dữ liệu
                    publisherJS.loadData(dataFromServer);
                }
            },
            error: function () {
                alert("Error!");
            }
        });

    }

    // Hàm dùng để gọi api lọc dữ liệu
    // Created by DXVUNG (30/5/2019)
    //getDataFilter(filterObject) {
    //    // Gọi ajax post dữ liệu lên server
    //    $.ajax({
    //        method: "Post",
    //        url: "/suppiers/getDataFilter",
    //        data: JSON.stringify(filterObject),
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (response) {
    //            if (response.Success === false) {
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
    //Created by DXVUNG (23/5/2019)
    save(url, publisher) {

        $('.grid-view .data-item-row').remove();
        $('.loading').show();
        $.ajax({
            method: "POST",
            url: url,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(publisher),
            success: function (response) {
                if (response.Success === false) {
                    alert(response.Message);
                }
                else {
                    $('.loading').hide();
                    publisherJS.getData();
                    //Nêu là thêm mới thì sắp xếp theo tên
                    //if (state === "create") dataFromServer.sort(dynamicSort('PublisherName'));
                    //publisherJS.loadData();
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });

    }

    //Hàm xóa dữ liệu trên server bởi id
    //Created by DXVUNG (25/5/2019)
    delete(publisherID) {
        $.ajax({
            method: "POST",
            url: "/publishers/delete/" + publisherID,
            contentType: "application/json;charset=UTF-8",
            success: function (response) {
                if (response.Success === false) {
                    alert(response.Message);
                }
                else {
                    //Xóa nhà xuất bản trong mảng dataFromSerVer
                    for (var i = 0; i < dataFromServer.length; i++) {
                        if (dataFromServer[i].PublisherID === publisherID) {
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
                    publisherJS.firstRowSelected();
                    publisherJS.disableEditDeleteButton();
                    publisherJS.dlgPublisherDelete.closeDialog();
                    //Số lượng nhà xuất bản
                    var numberOfTotalPublishers = dataFromServer.length;
                    //Số lượng nhà xuất bản đang hiện
                    var numberOfCurrentPublishers = $('.data-item-row').length - 1;
                    $('.grid-footer-right > span').text('Hiển thị 1 - ' + numberOfCurrentPublishers + ' trên ' + numberOfTotalPublishers + ' kêt quả');
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });
    }

    //Hàm xóa tất cả dữ liệu trên server
    //Created by DXVUNG (25/5/2019)
    deleteAll() {
        $.ajax({
            method: "POST",
            url: "/publishers/delete",
            contentType: "application/json;charset=UTF-8",
            success: function (response) {
                if (response.Success === false) {
                    alert(response.Message);
                }
                else {
                    dataFromServer.splice(0, dataFromServer.length);
                    $('.grid .row-selected').remove();
                    publisherJS.firstRowSelected();
                    publisherJS.disableEditDeleteButton();
                    publisherJS.dlgPublisherDelete.closeDialog();
                    //Số lượng nhà xuất bản đang hiện
                    var numberOfCurrentPublishers = $('.data-item-row').length - 1;
                    //Số lượng nhà xuất bản
                    var numberOfTotalPublishers = dataFromServer.length;
                    $('.grid-footer-right > span').text('Không có kết quả nào');
                }
            },
            fail: function () {
                alert('Có lỗi xảy ra');
            }
        });
    }



    //Hàm xử lý validate 
    //Created by DXVUNG (30/5/2019)
    setValidateDialog() {
        //Xử lý sự kiện khi blur ra khỏi ô nhập liệu
        $('.required').blur(validate.requiredInputBlur);
        //Viết hoa chữ cái đầu tiên và cắt khoảng trắng
        $('.dlgPublisherDetail input, textarea').keypress(function () {
            var inputValue = $(this).val();
            inputValue = validate.convertStringToStandard(inputValue);
            $(this).val(inputValue);
        });
    }

    // Các sự kiện mặc định khi vào trang web
    // Created by DXVUNG (28/5/2019)
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
    // Created by DXVUNG (28/5/2019)
    setClickButtonToolBarPublishers() {
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


        //Hàm khởi tạo về sự kiện Context menu
        // Nếu bấm vào icon thêm mới chuột phải
        $('#btn-Add').click(this.btnAddClick);
        // Nếu bấm vào icon sửa chuột phải
        $('#btn-Edit').click(this.btnEditClick);
        // Nếu bấm vào icon xóa chuột phải
        $('#btn-Delete').click(this.btnDeleteClick);
        // Nếu bấm vào icon nạp chuột phải
        $('#btn-Refresh').click(this.btnRefreshClick);
        // Nếu bấm vào icon giúp chuột phải
        $('#btn-Help').click(this.btnHelpClick);

    }

    // Hàm xử lý khi click vào các button trên dialog thêm hoặc sửa
    // Created by DXVUNG (28/5/2019)
    setClickButtonOnAddOrEditDialog() {
        $('#btnSave').click(this.btnSaveClick);
        $('#btnCancel').click(this.btnCancelClick);
    }

    // Hàm xử lý khi click vào các button trên dialog xóa
    // Created by DXVUNG (28/5/2019)
    setClickButtonDialogDelete() {
        $('#btnYes').click(this.btnYesClick);
        $('#btnNo').click(this.btnNoClick);
    }

    // Hàm xử lý khi click vào checkbox trên dialog
    // Created by DXVUNG (28/5/2019)
    setEventClickCheckboxOnDialog() {
        $('#chkUse').click(this.chkUseClick);
    }


    // Hàm nháy đúp chuột vào một hàng dữ liệu
    // Created by DXVUNG (23/5/2019)
    setEventDoubleClickRowData() {
        $('.data-item-row').dblclick(function () {
            publisherJS.btnEditClick();
        })
    }

    // Hàm xử lý highlight dòng dữ liệu được click vào và nêu nhấn dữ ctrl rồi click thì chọn được nhiều hàng
    // Created by DXVUNG (28/5/2019)
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
    // Created by DXVUNG (28/5/2019)
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
    // Created by DXVUNG (28/5/2019)
    setEventClickColumnTitle() {
        $('.column-title').click(this.sortDataByColumnTitle);
    }

    //Hàm xử lý chức năng tab trên dialog
    //Created by DXVUNG (15/5/2019)
    setTabIndex() {
        //Tab
        $('#focusguard').keyup(function (e) {
            if (e.keyCode === 9) $("#txtPublisherCode").focus();
        });
        //Shift tab
        $('#txtPublisherCode').keydown(function (e) {
            if (e.shiftKey && e.keyCode === 9) $("#focusguard").focus();
        });
    }
    
    //Hàm xử lý chức năng Context Menu trên grid-view
    //Created by DXVUNG (15/5/2019)
    setContextMenu() {
        $(window).bind("contextmenu", function (event) {
            event.preventDefault();
            //xét vị trí cho Y
            var y = event.pageY;
            var height_monitor = $(window).height();
            var height_popup = 137;
            if (y + height_popup > height_monitor) {
                var temp1 = y + height_popup - height_monitor;
                y = y - temp1;
            }
            //xét vị trí cho X
            var x = event.pageX;
            var width_monitor = $(window).width();
            var width_popup = 122;
            if (x + width_popup > width_monitor) {
                var temp2 = x + width_popup - width_monitor;
                x = x - temp2;
            }

            $("#contextmenu")
                .show()
                .css({ top: y, left: x });
        });
        $('.grid').click(function () {
            isHovered = $("ul.contextMenu").is(":hover");
            if (isHovered === false) {
                $("ul.contextMenu").fadeOut("fast");
            }
        });
    }
    //Hàm xử lý chức năng Đóng Context menu
    //Created by DXVUNG (15/5/2019)
    setCloseContextMenu() {
        $(document).mouseup(function (e) {
            var container = $("#contextmenu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
            }
        });
    }


    //Hàm xử lý chức năng tab trên dialog
    //Created by DXVUNG (15/5/2019)
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
    //Created by DXVUNG (7/5/2019)
    btnSaveClick() {
        //Validate dữ liệu
        if (validate.validateInput()) {
            //Lấy dữ liệu trên form, build thành object:
            var listElements = $('[dataIndex]');
            var publisher = {};
            $.each(listElements, function (index, element) {
                var fieldName = $(element).attr('dataIndex');
                var fieldValue;
                if (fieldName === "Use") {
                    if ($(element).hasClass('checkbox-true'))
                        fieldValue = "true";
                    else
                        fieldValue = "false";
                } else {
                    fieldValue = $(element).val().trim();
                }
                publisher[fieldName] = fieldValue;

            });

            //Gọi api thêm nếu biến state ="create", goi sửa nếu là "edit"
            if (state === "create") {
                publisherJS.save('/publishers/new', publisher);
            }
            else if (state === "edit") {
                publisherJS.save('/publishers/edit', publisher);
            }
            //Đóng dialog
            publisherJS.dlgPublisherDetail.closeDialog();
        }
        else {
            //alert("Vui lòng điền đầy đủ dữ liệu");
            //$('.border-red').attr('title', 'Dữ liệu không được để trống!');
        }
    }

    //Hàm xử lý chức năng hủy trên dialog
    //Created by DXVUNG (15/5/2019)
    btnCancelClick() {
        publisherJS.dlgPublisherDetail.closeDialog();
    }

    //Hàm xử lý chức năng check sử dụng trên dialog
    //Created by DXVUNG (15/5/2019)
    chkUseClick() {
        if ($('#chkUse img').hasClass('checkbox-true')) {
            $('#chkUse img').removeClass('checkbox-true');
        } else {
            $('#chkUse img').addClass('checkbox-true');
        }
    }

    //Hàm xử lý nhấn click yes trên dialog xóa
    //Created by DXVUNG (20/5/2019)
    btnYesClick() {
        ////Lấy ID của bản ghi
        //var rowSelected = $(".row-selected");
        //var publisherID = rowSelected.data().PublisherID;
        ////Xóa bản ghi
        //if (rowSelected.length === 1) {
        //    publisherJS.delete(publisherID);
        //}
        //else {
        //    publisherJS.deleteAll();
        //}
        // Lấy thông tin của bản ghi được chọn
        var element = $(".row-selected");
        var perentElement = element.parent();
        //var memberID = element.data().id;
        var memberID = element.data().PublisherID;
        var elementName = element.contents()[2];
        var textName = elementName.textContent;

        // Gọi ajax api để check xem có thông tin liên quan của bản ghi hay không
        var listObject = textObj.GetData("getBookPublisher/" + memberID);

        // Nếu bản ghi có thông tin liên quan thì chạy dialog thông báo không được xóa
        if (listObject.Data.length > 0) {
            var dialogCantDeleteState = new DialogState(".dlgPublisherDelete", 'auto', 131, "QLTH.VN", textName + " đang chọn đã phát sinh dữ liệu liên quan. Bạn không thể xóa.", "nodelete");
            dialogCantDeleteState.openDialog();
            $("#btnYes").on("click", function () {
                dialogCantDeleteState.closeDialog();
            });
        } else if (listObject.Data.length === 0) {
            // Nếu bản ghi không có thông tin liên quan thì cho phép xóa và hiện dialog dưới đây
            var dialogDeleteState = new DialogState(".dlgPublisherDelete", 'auto', 131, "QLTH.VN", "Bạn có thực sự muốn xóa bạn đọc " + textName + " đang chọn không?", "allowdelete");
            dialogDeleteState.openDialog();
            //Trước ghi gán sự kiện ta xóa kết sự hiện trước đó vào 2 button yes và no
            $('#btnYes, #btnNo').unbind();
            // Gán sự kiện cho nút Yes khi xác nhận xóa bản ghi
            $("#btnYes").on("click", function () {
                // Gọi hàm thực hiện xóa bản ghi
                publisherJS.DeletePublisher(memberID);
                // Đóng dialog
                dialogDeleteState.closeDialog();
             
                //// Check xem đang đứng ở grid nào
                //if (perentElement.hasClass("row-grid-clone")) {
                //    // Attach lại dữ liệu vào table bạn đọc học sinh
                //    textObj.AttachDataToTableReader("/publishers/getlistPublisher");
                //} else if (perentElement.hasClass("tbody-teacher")) {
                //    // Attach lại dữ liệu vào table bạn đọc giáo viên
                //    textObj.AttachDataToTableReader("/readers/getlistTeacherReader");
                //}

                //location.reload();
            });
            // Gán sự kiện cho nút NO 
            $("#btnNo").on("click", function () {
                dialogDeleteState.closeDialog();
            });
        }

    };

    //Hàm xử lý nhấn click no trên dialog xóa
    //Created by DXVUNG (20/5/2019)
    btnNoClick() {
        publisherJS.dlgPublisherDelete.closeDialog();
    }

    //Hàm tạo phím tắt
    //Created by DXVUNG (15/5/2019)
    createShortcutKey() {
        window.onkeydown = function (event) {

            //Ctrl + Alt+ N mở dialog thêm
            if (event.ctrlKey && event.altKey && event.keyCode === 78) {
                publisherJS.btnAddClick();
            }
            //Ctrl + E mở dialog sửa
            if (event.ctrlKey && event.keyCode === 69) {
                publisherJS.btnEditClick();
                event.preventDefault();
            }
            //Ctrl + D xóa
            if (event.ctrlKey && event.keyCode === 68) {
                publisherJS.btnDeleteClick();
                event.preventDefault();
            }

            //Ctrl + R nạp  
            if (event.ctrlKey && event.keyCode === 82) {
                publisherJS.btnRefreshClick();
                event.preventDefault();
            }

            //Ctrl + H giúp
            if (event.ctrlKey && event.keyCode === 72) {
                publisherJS.btnHelpClick();
                event.preventDefault();
            }

            //Ctrl + S lưu
            if (event.ctrlKey && event.keyCode === 83) {
                publisherJS.btnSaveClick();
                event.preventDefault();
            }

            //Ctrl + Q hủy 
            if (event.ctrlKey && event.keyCode === 81) {
                publisherJS.btnCancelClick();
                event.preventDefault();
            }

            //Ctrl + F8 click vào "Có"
            if (event.ctrlKey && event.keyCode === 119) {
                publisherJS.btnYesClick();
                event.preventDefault();
            }

            //Ctrl + F9 click vào "Không"
            if (event.ctrlKey && event.keyCode === 120) {
                publisherJS.btnNoClick();
                event.preventDefault();
            }

            //Ctrl + A chọn tất cả
            if (event.ctrlKey && event.keyCode === 65) {
                //alert('Chọn tất');
                $('.data-item-row').removeClass('row-selected');
                $('.data-item-row').addClass('row-selected');
                event.preventDefault();
            }

            var rowFocus = $('.row-selected');

            //Di chuyển lên hàng trên
            if (event.keyCode === 38) {
                var rowFocus = $('.row-selected').prev();
                if (rowFocus.hasClass('data-item-row')) {
                    $('.grid-view .row-selected').removeClass('row-selected');
                    rowFocus.addClass('row-selected');
                }
                event.preventDefault();
            }

            //Di chuyển xuống hàng dưới
            if (event.keyCode === 40) {
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
    // Created by DXVUNG (5/5/2019)
    btnAddClick() {
        state = "create";
        //alert("Bạn vừa click vào nút thêm!");

        publisherJS.dlgPublisherDetail.openDialog();
        publisherJS.dlgPublisherDetail.optionDialog("title", "Thêm nhà xuất bản");
        // Ẩn checkbox
        $("#chkUse").addClass('none-display');
        // Thêm giá trị vào ô đầu tiên
        $("#txtPublisherCode").val("00001");

        $("#contextmenu").hide();
    }

    // Xử lý khi click vào nút sửa
    // Created by DXVUNG (5/5/2019)
    btnEditClick() {
        state = "edit";
        //alert("Bạn vừa click vào nút sửa!");
        publisherJS.dlgPublisherDetail.openDialog();
        publisherJS.dlgPublisherDetail.optionDialog("title", "Sửa nhà xuất bản");
        // Hiện checkbox
        $("#chkUse").removeClass('none-display');
        var data = [];
        // Lấy ID của bản ghi
        var rowSelected = $(".row-selected");
        var publisherID = rowSelected.data().PublisherID;
        data.push(publisherID);
        // Lấy giá trị tử hàng được chọn
        var dataCell;
        $('.row-selected span').each(function () {
            dataCell = $(this).text();
            data.push(dataCell);
        });
        //Truyền dữ liệu vào form
        $('.dlgPublisherDetail #txtPublisherID').val(data[0]);
        $('.dlgPublisherDetail #txtPublisherCode').val(data[2]);
        $('.dlgPublisherDetail #txtPublisherName').val(data[3]);
        $('.dlgPublisherDetail #txtAddress').val(data[4]);
        $('.dlgPublisherDetail #txtNote').val(data[5]);

        //Kiểm tra xem checkbox true hay false, nếu có class check-true thì checkbox đang tích, nếu không có thì không tích
        var isCheck = $('.row-selected img').hasClass('checkbox-true');
        if (isCheck) {
            $('#chkUse img').addClass('checkbox-true');
        }
        else {
            $('#chkUse img').removeClass('checkbox-true');
        }
        $("#contextmenu").hide();
    }


    //Khu vực xử lý sự kiện trên thanh toolbar

    // Xử lý khi click vào nút xóa
    // Created by DXVUNG (5/5/2019)
    btnDeleteClick() {
        //alert("Bạn vừa click vào nút xóa!");
        publisherJS.dlgPublisherDelete.openDialog();
        publisherJS.dlgPublisherDelete.optionDialog("title", "QLTH.VN");
        //Khi xóa nhiều nhà xuất bản một lúc
        if ($('.row-selected').length > 2) {
            publisherJS.dlgPublisherDelete.optionDialog("width", "420");
            //error logic: sai title dialog thông báo xóa nhà xuất bản vs những nhà xuất bản
            //$('.dlgPublisherDelete .publisherTitle').text('Những nhà xuất bản');
        }
        $("#contextmenu").hide();
    }

    // Xử lý khi click vào nút nạp
    // Created by DXVUNG (5/5/2019)
    btnRefreshClick() {
        //alert("Bạn vừa click vào nút nạp!");
        $('.grid-view .data-item-row').remove();
        publisherJS.getData();
    }

    // Xử lý khi click vào nút giúp
    // Created by DXVUNG (5/5/2019)
    btnHelpClick() {
        alert("Bạn vừa click vào nút giúp!");
        //window.open('http://help.qlth.vn/tv_nha_cung_cap.htm');
        $("#contextmenu").hide();
    }

    //Xử lý disable khi grid không có dữ liệu
    //Created by DXVUNG (10/5/2019)
    disableEditDeleteButton() {
        if ($('.grid-view').children('.data-item-row').length === 0) {
            $('#btnEdit,#btnDelete').addClass('disabled-button');
            $('.grid-view .data-item-row').remove();
            //$('.grid-view').append('<div class="grid-empty"> Không có nhà xuất bản nào.</div >');
        }
        else {
            $('#btnEdit,#btnDelete').removeClass('disabled-button');
            //$('.grid-view').removeClass('<div class="grid-empty"> Không có nhà xuất bản nào.</div >');
        }

    }
    //Xử lý hiển thị khi grid có dữ liệu
    //Created by DXVUNG (10/5/2019)


    //Khu vực xử lý sự kiện trên grid 

    //Xử lý khi click vào header grid
    //Created by DXVUNG (10/5/2019)
    sortDataByColumnTitle() {
        var stateSort = $(this).attr("state");
        var title = $(this).parent().attr('fieldData');
        var numberOfPublishers = dataFromServer.length;
        switch (stateSort) {
            case "normal":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).children(':first-child').addClass('grid-arrow-up');
                $(this).attr('state', 'arrow up');
                //Nếu tiêu đề là mã nhà xuất bản thì parseInt mã code chỉ lấy phần số
                if (title === "PublisherCode") {
                    for (var i = 0; i < numberOfPublishers; i++) {
                        dataFromServer[i].PublisherCode = parseInt(dataFromServer[i].PublisherCode.substr(3));
                    }
                }
                dataFromServer.sort(dynamicSort(title));
                //Nếu tiêu đề là mã nhà xuất bản thì cộng vào mã code thêm chuỗi "000"
                if (title === "PublisherCode") {
                    for (var i = 0; i < numberOfPublishers; i++) {
                        dataFromServer[i].PublisherCode = "000" + dataFromServer[i].PublisherCode;
                    }
                }
                $('.grid-view .data-item-row').remove();
                publisherJS.loadData();
                break;
            case "arrow up":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).children(':first-child').addClass('grid-arrow-down');
                $(this).attr('state', 'arrow down');
                //Nếu tiêu đề là mã nhà xuất bản thì parseInt mã code chỉ lấy phần số
                if (title === "PublisherCode") {
                    for (var i = 0; i < numberOfPublishers; i++) {
                        dataFromServer[i].PublisherCode = parseInt(dataFromServer[i].PublisherCode.substr(3));
                    }
                }
                title = "-" + title;
                dataFromServer.sort(dynamicSort(title));
                //Nếu tiêu đề là mã nhà xuất bản thì cộng vào mã code thêm chuỗi "NCC00"
                if (title === "-PublisherCode") {
                    for (var i = 0; i < numberOfPublishers; i++) {
                        dataFromServer[i].PublisherCode = "000" + dataFromServer[i].PublisherCode;
                    }
                }
                $('.grid-view .data-item-row').remove();
                publisherJS.loadData();
                break;
            case "arrow down":
                $('.column-title span').removeClass('grid-arrow-up');
                $('.column-title span').removeClass('grid-arrow-down');
                $(this).attr('state', 'normal');
                if (title === "PublisherCode") title = parseInt(title.substr(3));
                dataFromServer.sort(dynamicSort('PublisherName'));
                $('.grid-view .data-item-row').remove();
                publisherJS.loadData();
                break;
            default: break;
        }
    }



    //Hàm highlight vào hàng đầu tiên của bảng dữ liệu
    //Created by DXVUNG (10/5/2019)
    firstRowSelected() {
        //$('.data-item-1').first().addClass("row-selected");
        $('.grid-view div.row-selected').removeClass("row-selected");
        $('.data-item-row').first().addClass("row-selected");

    }

    //Hàm xử lý các sự kiện dưới grid footer
    //Created by DXVUNG (10/5/2019)
    setEventForGridFooter() {
        //Xử lý sự kiện thay đổi background cho số lượng các bản ghi trên selection khi click
        $('.select-record > div').click(function () {
            $('.select-record > div').css("background-color", "white");
            $(this).css("background-color", "#b3d7ff");
            var recordDisplay = $(this).text();
            $('.number-display-record > input').val(recordDisplay);

        });
    }

    //Hàm xử lý chức năng Lọc khi bấm enter khi đang focus vào filter input
    //Created by DXVUNG(20/5/2019)
    //Còn sai lỗi logic và chưa focus vào dòng đầu 
    setFilterData() {
        $('.filter-input > input').keydown(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode === '13') {
                var value = $(this).val().toLowerCase();
                //if ($(".grid div.data-item-3 >span:not(:contains('" + this.value + "'))")) {
                $(".grid div.data-item-3 >span:not(:contains('" + this.value + "'))").parent().parent().hide();
                $(".grid div.data-item-3 >span:contains('" + this.value + "')").parents().show();
                //$('.grid-view').append('<div class="grid-empty"> Không có nhà xuất bản nào.</div >');
            }
            //else {
            //    $(".grid div.data-item-3 >span:not(:contains('" + this.value + "'))").parent().parent().hide();
            //    $(".grid div.data-item-3 >span:contains('" + this.value + "')").parents().show();
            //}

        });
    }
}

//Tạo đối tượng Validate
validate = new Validate();

//Khởi tạo một đối tượng nhà xuất bản
var publisherJS = new PublisherJS();

//Biến xem dialog loại nào
var state;

//Ẩn đối tượng khi click ra ngoài đối tượng
//Created by DXVUNG(15/5/2019)
$(document).on('click', function (event) {
    if (!$(event.target).hasClass('hide-on-click') && !$(event.target).hasClass('toggle-btn'))
        $('.hide-on-click').hide();
})
//Lưu khi bấm enter khi đang focus vào nút save 
//Created by DXVUNG(20/5/2019)
$('#btnSave').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === '13') {
        publisherJS.btnSaveClick();
    }
});
//Hủy khi bấm enter khi đang focus vào nút hủy 
//Created by DXVUNG(20/5/2019)
$('#btnCancel').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === '13') {
        publisherJS.btnCancelClick();
    }
});
//Thay đổi trạng thái check box sử dụng khi nhấn space
//Created by DXVUNG(20/5/2019)
$('#chkUse').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === '32') {
        publisherJS.chkUseClick();
    }
});


//Hàm sắp xếp động theo thuộc tính
//Created by DXVUNG(20/5/2019)
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