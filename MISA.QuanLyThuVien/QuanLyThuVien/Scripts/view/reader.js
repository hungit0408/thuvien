
// Hàm chạy
// Created by:NVSON (05/05/2019)
$(document).ready(function () {
    reader.MakeDataFilter();
});

// Khởi tạo 1 con trỏ global
// Created by: NDTRUONG (05/05/2019)
var textObj;
// Khởi tạo đối tượng Validate
// Create by: NVSON (20/5/2019)
var validate = new Validate();
// Khởi tạo 1 đối tượng reader
// Created by: NVSON (05/05/2019)
class Reader {
    // Khởi tạo Constructor
    // Created by: NVSON (05/05/2019)
    constructor() {
        // Con trỏ object của đối tượng reader
        textObj = this;

        // Hàm khởi tạo các sự kiện
        this.initEvents();

        //Gọi hàm xử lý validate
        validate.requiredInputBlur();
        // Gọi hàm xử lý validate ngày đúng định dạng
        validate.ValidateDateTime();
        
        // Khởi tạo dialog đăng kí bạn đọc
        this.dialogRegistration = new DialogReader('#dlgRegistrationReader', 745, 322, "Đăng ký bạn đọc", this);

        // Khởi tạo dialog đăng kí bạn đọc từ danh sách 
        this.dialogRegistrationList = new DialogReader("#dlgResgisterReaderList", 720, 490, "Đăng ký bạn đọc từ danh sách học sinh", this);

        // Khởi tạo một biến đại điện cho trạng thái của btn-Save trên từng dialog khác nhau
        // Mặc định true là khi thực hiện chức năng Save dữ liệu
        this.btnSaveState = true;

        // Trạng thái dialog đăng kí bạn đọc (mặc định ban đầu là student)
        this.ReaderState = "student";

        // Gọi hàm xử lý các phím tắt
        this.HandleShortcutKey();

        // Hàm xử lý context menu
        this.HandleContextMenu();
    }

    // Các hàm này dùng để tạo action cho button
    // Created by: NVSON (05/05/2019)
    initEvents() {
        // ======================= SỰ KIỆN CHỨC NĂNG =============================
        // Click button bạn đọc và button giáo viên
        $("#btnStudent, #btnTeacher ").on("click", this.HandleTabGrid);
        // Sự kiện click đăng kí bạn đọc từ danh sách học sinh/ giáo viên
        $(".dropdown-item-reg").on("click", this.RegistrationListOnClick);
        // Sự kiện click vào nút đăng kí bạn đọc
        $('.btn-dk').on('click', this.RegistrationOnClick);
        // Click nút sửa bản ghi trên thanh công cụ
        $('.btnEdit').on("click", this.BindDataOnDialogEdit);
        // Click nút xóa bản ghi trên thanh công cụ
        $(".btnDelete").on("click", this.ClickButtonDelete);
        // Click nút nạp lại trang
        $(".btnLoad").on("click", this.ReloadTable);
        // Click nút save trên dialog đăng kí bạn đọc
        $("#btn-Save").on("click", this.SaveAndEditBookReader);
        // Click hủy đăng kí bạn đọc
        $("#btn-Cancel").on("click", this.CancelClick);
        

        //==================== SỰ KIỆN FILTER, LỌC, PHÂN  TRANG ============================
        // Click vào th trên table bạn đọc
        $(".column-title").on("click", this.SortDataReader);
        // Sự kiện click vào ô input filter 
        $(".column-filter input").on("click", this.ClickInputFilter);
        // Các sự kiện click chuyển trang trên grid master
        $(".grid-one .next-on span").on("click", this.HandleNextPage);
        $(".grid-one .prev-on span").on("click", this.HandlePreviousPage);
        // Click vào icon để tạo selectbox ở phần table footer (lựa chọn page-size)
        $('.icon-selection').click(this.HandleSelectPageSize);

        // =====================CÁC SỰ KIỆN KHÁC ===============================
        // Sự kiện click vào bản ghi trên table
        $('tbody').on('click', 'tr', this.HightLightItem);
        // Double click vào bản ghi và bind dữ liệu vào dialog
        $(".table-tbody-reader").on('dblclick', 'tr', this.BindDataOnDialogEdit);
        // Sự kiện tự động thay đổi tên độc giả khi gõ firstname và lastname
        $('#txtFirstName, #txtLastName').on('change', this.GetFullName);
        $('#txtFirstName, #txtLastName').on('blur', this.GetFullName);
        // Focus vào ô nhập liệu ngày tháng
        $("#txtBirthday , #txtEffectDate, #txtDateAllocated, #txtExpireDate,.filter-birthday, .filter-dateallocated ,.filter-dateeffect, .filter-dateexpired, #dateAllocated-dialog2,#dateEffect-dialog2, #dateExpired-dialog2").on("focus", this.MaskInput);

        
        // Double click trên bản ghi ở table bạn đọc 
        // Sự kiện click chọn loại filter ở select box
        $(".dropdown-item").on("click", this.HandleSelectFilter);


       
    }

    // ============================ CÁC HÀM THỰC THI LIÊN QUAN ĐẾN GET DATA =================================

    // Hàm lấy dữ liệu từ server lên clien
    // NVSON (13/5/2019)
    GetData(url,data) {
        var Object = {};
        if (data) {
            $.ajax({
                type: "POST",
                url: url,
                dataType: "JSON",
                data: JSON.stringify(data),
                async: false,
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    Object = result;
                },
                error: function (Result) {
                    Object = Result;
                }
            });
        } else {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "JSON",
                async: false,
                success: function (result) {
                    Object = result;
                },
                error: function (Result) {
                    Object = Result;
                }
            });
        }
        return Object;
    }

    // Hàm gắn kết dữ liệu vào table bạn đọc
    // Created by: NVSON (24/5/2019)
    AttachDataToTableReader(url,data) {

        // Xóa toán bộ các thẻ tr bên trong thẻ tbody
        $('.table-tbody-reader').children().remove();
        // Check xem loại dữ liệu của học sinh hay giáo viên để attact dữ liệu vào đúng grid
        var tbody;
        if (textObj.ReaderState === "student") {
            tbody = $(".table-tbody-reader.tbody-student");
        } else {
            tbody = $(".table-tbody-reader.tbody-teacher");
        }
        // Gọi hàm GetData lấy bản ghi từ server về
        var ajaxResult = textObj.GetData(url,data);

        // Tiến hành attach data
        if (ajaxResult) {
            console.log(ajaxResult.Data);
            // Nếu số lượng bản ghi bằng 0 thì disable các button sửa, xóa, xuất khẩu
            if (ajaxResult.Data.ListBookReaderFilter.length === 0) {
                $(".btnEdit,.btnDelete,.btnExport").addClass("disable-btn");
            }
            var listElement = $('.grid-one.show-grid div[fieldData]');
            $.each(ajaxResult.Data.ListBookReaderFilter, function (index, item) {
                var rowHtml = $('<tr></tr>');
                // Attach ID to <tr>
                rowHtml.data("id", item.BookReaderID);
                // Apppend data to element
                $.each(listElement, function (i, element) {
                    var fieldName = $(element).attr("fieldData");
                    var fieldValue = item[fieldName];
                    // Check trường giới tính 
                    if (fieldName === "Gender") {
                        if (fieldValue === false) {
                            fieldValue = "Nữ";
                        } else {
                            fieldValue = "Nam";
                        }
                    }
                    // Check data type
                    var typeData = typeof (fieldValue);
                    // Check datetime type
                    if (Date.parse(fieldValue)) {
                        typeData = "date";
                    }
                    if (fieldName === "RowNumber") {
                        typeData = "numberOrder";
                    }
                    switch (typeData) {
                        case "string":
                            $(rowHtml).append('<td class="align-left">' + fieldValue + '</td>');
                            break;
                        case "numberOrder":
                            $(rowHtml).append('<td class="align-center">' + fieldValue + '</td>');
                            break;
                        case "date":
                            fieldValue = new Date(fieldValue);
                            var dateFormat = fieldValue.formatddMMMyyyy();
                            $(rowHtml).append('<td class="align-center">' + dateFormat + '</td>');
                            break;
                        default:
                            $(rowHtml).append('<td class="align-center">' + fieldValue + '</td>');
                    }
                    if (index === 0) {
                        $(rowHtml).addClass("highlight-tr");
                    }
                });
                $(tbody).append(rowHtml);
            });
        }
        else {
            console.log(ajaxResult);
            alert(ajaxResult.Message);
        }
        // Sau khi gãn xong dữ liệu check xem có bản ghi hay không để ẩn button
        textObj.DisableButton();
        // Gán dữ liệu phiểu mượn vào table lịch sử
        textObj.AttactDataBookToTableDetail();

        // Số thứ tự trang hiện tại
        var currentPage = $(".grid-one.show-grid .grid-footer .current-display-page input").val();
        // Tổng số trang
        var totalPage = ajaxResult.Data.TotalPage;
        // Tổng số bản ghi trong 1 trang
        var sizePage = $(".grid-one.show-grid .grid-footer .page-size input").val();
        // Tổng toàn bộ bản ghi lấy được 
        var totalRecord = ajaxResult.Data.TotalRecord;
        var fromRecord = ((currentPage * sizePage) - sizePage + 1);
        var toRecord = (currentPage * sizePage);
        
        if (toRecord > totalRecord) {
            toRecord = totalRecord;
           
        }
        if (totalPage === 1) {
            $(".grid-one.show-grid .next-on").css("display", "none");
            $(".grid-one.show-grid .next-off").css("display", "block");
            $(".grid-one.show-grid .prev-on").css("display", "none");
            $(".grid-one.show-grid .prev-off").css("display", "block");
        }
         // Tiến hành binding tổng số bản ghi, và tổng số page và các chỉ số khác
        $(".grid-one.show-grid .grid-footer .total-page").text(totalPage);
        $(".grid-one.show-grid .grid-footer .total-record").text(totalRecord);
        $(".grid-one.show-grid .grid-footer .from-record").text(fromRecord);
        $(".grid-one.show-grid .grid-footer .to-record").text(toRecord);
       
    }

    // Xử lý binding dữ liệu chi tiết phiếu mượn
    // NVSON: 26/6/2019
    AttactDataBookToTableDetail(url) {
        var api;
        // Lấy ID của bản ghi được select
        if (url) {
            api = url;
        } else {
            var element = $(".grid-one.show-grid .table-tbody-reader .highlight-tr");
            var IDReader = element.data().id;
            api = "/readers/getBorrowingBookReader/" + IDReader;
        }
        // Gọi ajax để lấy dữ liệu
        var ajaxResult = textObj.GetData(api);
        // Xóa toàn bộ dữ liệu cũ trong bản 
        $(".grid-two.show-grid .table-tbody-history").children().remove();
        if (ajaxResult) {
            // Tiến hành attach data 
            var listField = $(".grid-two.show-grid  div[fieldData]");
            $.each(ajaxResult.Data, function (index, item) {
                var rowHTML = $('<tr></tr>');
                // Găn kết dữ liệu vào thẻ tr
                $.each(listField, function (i, element) {
                    var fieldName = $(element).attr("fieldData");
                    var fieldValue = item[fieldName];
                    // Check data type
                    var typeData = typeof (fieldValue);
                    if (Date.parse(fieldValue)) {
                        typeData = "date";
                    }
                    // Check book state (true, false)
                    if (fieldName === "ReturnBookState") {
                        if (fieldValue === 2) {
                            fieldValue = "Đã trả";
                            typeData = 'state-t';
                        } else if (fieldValue === 3) {
                            fieldValue = "Mượn";
                            typeData = 'state-f';
                        } else {
                            fieldValue = "Mất";
                            typeData = 'state-n';
                        }
                    }
                    switch (typeData) {
                        case "string":
                            $(rowHTML).append('<td class="align-left">' + fieldValue + '</td>');
                            break;
                        case "date":
                            fieldValue = new Date(fieldValue);
                            var dateFomat = fieldValue.formatddMMMyyyy();
                            $(rowHTML).append('<td class="align-center">' + dateFomat + '</td>');
                            break;
                        case "state-t":
                            $(rowHTML).append('<td class="data-item-state-t"><span class="tag-img-state"></span><span><p>' + fieldValue + '</p></span></td>');
                            break;
                        case "state-f":
                            $(rowHTML).append('<td class="data-item-state-f"><span class="tag-img-state"></span><span><p>' + fieldValue + '</p></span></td>');
                            break;
                        case "state-n":
                            $(rowHTML).append('<td class="data-item-state-n"><span class="tag-img-state"></span><span><p>' + fieldValue + '</p></span></td>');
                            break;
                        default:
                            $(rowHTML).append('<td class="align-left">' + fieldValue + '</td>');
                    }
                });
                $('.grid-two.show-grid .table-tbody-history').append(rowHTML);
            });
        } else {
            console.log(ajaxResult);
            alert(Result.Message);
        }

    }

    // ============================ CÁC HÀM THỰC THI LIÊN QUAN ĐẾN PUSH DATA=================================

    // Hàm push data về server
    // NVSON 15/5/2019
    PushData(url, id) {
        //Check validate

        // Lấy dữ liệu từ dialog
        var elements = $("#dlgRegistrationReader input[name], #dlgRegistrationReader select[name]");
        var reader = {};
        if (id) {
            reader.BookReaderID = id;
        }
        reader["IsStudent"] = textObj.ReaderState === "student" ? true : false;
        $.each(elements, function (index, element) {
            var name = $(element).attr("name");
            if (name === "BookReaderCode") {
                reader[name] = $(element).val();
            } else if (name === "FirstName" || name === "LastName" || name === "FullName") {
                reader[name] = $(element).val().trim();
            } else if (name === "ClassOrOrganizationUnit") {
                reader[name] = $(element).val();
            } else if (name === "Gender") {
                reader[name] = parseInt($(element).val()) === 1 ? true : false;
            } else if (name === "BirthDate" || name === "IssueDate" || name === "ValidityDate" || name === "ExpiryDate") {
                var dateObject = $(element).datepicker("getDate");
                var dateString = $.datepicker.formatDate("yy-mm-dd", dateObject);
                reader[name] = dateString;
            } else if (name === "BookReaderAddress") {
                reader[name] = $(element).val();
            } else {
                reader[name] = $(element).val();
            }
        });
        // Gửi dữ liệu về server
        var PushResult = {};
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(reader),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (ajaxResult) {
                PushResult = ajaxResult;
            },
            error: function (ajaxResult) {
                PushResult = ajaxResult;
            }
        });
        return PushResult;
    }


    // =============== CÁC HÀM THỰC THI LIÊN QUAN ĐẾN DIALOG VÀ CHỨC NĂNG TRÊN TOOLBAR ======================

    // Xử lý button đăng kí bạn đọc không phải từ danh sách học sinh
    // Created by: NVSON (05/05/2019)
    RegistrationOnClick() {
        var btnstate = $(this).hasClass("btn-teacher");
        // Kiểm tra xem button đang ấn là đăng kí bạn đọc học sinh hay bạn đọc giáo viên
        if (btnstate) {
            textObj.ReaderState = "teacher";
        } else {
            textObj.ReaderState = "student";
        }

        textObj.dialogRegistration.openDialog();
        $('#txtFirstAndMiddleName').focus();
    }

    // Tạo dialog đăng ký bạn đọc từ danh sách học sinh
    // Created by: NDTRUONG (05/05/2019)
    RegistrationListOnClick() {
        textObj.dialogRegistrationList.openDialog();
    }

    // Hàm lưu dữ liệu từ dialog về server
    // NVSON 15/5/2019
    SaveAndEditBookReader() {
        // Validate trước khi lưu hoặc edit
        if (validate.validateInput()) {
            // Kiểm tra xem nút save đang ở trạng thái edit
            if (textObj.btnSaveState === false) {
                // Lấy ID của bản ghi
                var element = $(".table-tbody-reader .highlight-tr");
                var id = element.data().id;
                    // Gọi hàm xử lý push dữ liệu về server để edit bản ghi
                    var resultedit = textObj.PushData("/readers/editReader", id);
                    if (resultedit.Success === true) {
                        // Đóng dialog và gán lại trạng thái btnSave
                        textObj.dialogRegistration.closeDialog();
                        textObj.btnSaveState = true;
                    } else {
                        // Hiện dialog thông báo lỗi
                        var dialogCantEdit = new DialogState("#dlgStateDelete", 'auto', 131, "QLTH.VN", resultedit.Message, "duplicate");
                        dialogCantEdit.openDialog();
                        $('#btn-state-yes, #btn-state-no').unbind();
                        $("#btn-state-agree").on("click", function () {
                            dialogCantEdit.closeDialog();
                        });
                    }
                // Load lại data trên bảng
                textObj.MakeDataFilter();
            } else
            {
                debugger;
                //Gọi hàm xử lý push dữ liệu về server để thêm bản ghi
                var result = textObj.PushData("/readers/insertReader");
                // Kiểm tra xem Push không bị lỗi mới cho đóng dialog
                if (result.Success === true) {
                    textObj.dialogRegistration.closeDialog();
                } else {
                    // Hiện dialog thông báo lỗi
                    var dialogCantSave = new DialogState("#dlgStateDelete", 'auto', 131, "QLTH.VN", result.Message , "duplicate");
                    dialogCantSave.openDialog();
                    $('#btn-state-yes, #btn-state-no').unbind();
                    $("#btn-state-agree").on("click", function () {
                        dialogCantSave.closeDialog();
                    });
                }
                // Load lại data trên bảng
                textObj.MakeDataFilter();
            }
        } else {
            $('.border-red').attr('title', 'Dữ liệu không được để trống!');
        }
    }

    // Hàm đóng dialog và reset button
    // Create by NVSON (25/5/2019)
    CancelClick() {
        textObj.btnSaveState = true;
        textObj.dialogRegistration.closeDialog();
    }

    // Hàm bind data vào dialog edit bản ghi
    // Created by NVSON (25/5/2019)
    BindDataOnDialogEdit() {
        // Mở dialog và gán lại sự kiện cho btnSave
        textObj.dialogRegistration.openDialog();
        // Lấy ID của bản ghi
        var element = $(".table-tbody-reader .highlight-tr");
        var memberID = element.data().id;
        // Gọi hàm GetData để lấy bản ghi
        var url = "/readers/getRecord/" + "{" + memberID + "}";
        var ajaxResult = textObj.GetData(url);
        var Object = ajaxResult.Data;
        // Gắn dữ liệu từ Object vào dialog
        var propertyName = $("#dlgRegistrationReader input[name], #dlgRegistrationReader select[name]");
        $.each(propertyName, function (index, item) {
            var name = $(item).attr("name");
            if (name === "FirstName" || name === "LastName" || name === "BookReaderCode" || name === "ClassOrOrganizationUnit" || name === "BookReaderAddress" || name === "FullName") {
                $(item).val(Object[0][name]);
            } else if (name === "BirthDate" || name === "IssueDate" || name === "ValidityDate" || name === "ExpiryDate") {
                // Convert định dạng ngày tháng
                var date = new Date(Object[0][name]);
                var dateFormat = date.formatddMMMyyyy();
                $(item).val(dateFormat);
            } else if (name === "Gender") {
                var gender = Object[0][name];
                var genderValue = gender === true ? 1 : 0;
                $(item).val(genderValue);
            } else {
                $(item).val(Object[0][name]);
            }
        });
        // Gán lại btnSaveState = false
        textObj.btnSaveState = false;
    }

    // Click vào toolbar xóa bản ghi
    // Created by: NVSON (25/5/2019)
    ClickButtonDelete() {
        // Lấy thông tin của bản ghi được chọn
        var element = $(".table-tbody-reader .highlight-tr");
        var perentElement = element.parent();
        var memberID = element.data().id;
        var elementName = element.contents()[2];
        var textName = elementName.textContent;

        // Gọi ajax api để check xem có thông tin liên quan của bản ghi hay không
        var listObject = textObj.GetData("/readers/getBorrowingBookReader/" + memberID);
        
        // Nếu bản ghi có thông tin liên quan thì chạy dialog thông báo không được xóa
        if (listObject.Data.length > 0) {
            var dialogCantDeleteState = new DialogState("#dlgStateDelete", 'auto', 131, "QLTH.VN", textName + " đang chọn đã phát sinh dữ liệu liên quan. Bạn không thể xóa.", "nodelete");
            dialogCantDeleteState.openDialog();
            $("#btn-state-agree").on("click", function () {
                dialogCantDeleteState.closeDialog();
            });
        } else if (listObject.Data.length === 0){
            // Nếu bản ghi không có thông tin liên quan thì cho phép xóa và hiện dialog dưới đây
            var dialogDeleteState = new DialogState("#dlgStateDelete", 'auto', 131, "QLTH.VN", "Bạn có thực sự muốn xóa bạn đọc " + textName + " đang chọn không?", "allowdelete");
            dialogDeleteState.openDialog();
            //Trước ghi gán sự kiện ta xóa kết sự hiện trước đó vào 2 button yes và no
            $('#btn-state-yes, #btn-state-no').unbind();
            // Gán sự kiện cho nút Yes khi xác nhận xóa bản ghi
            $("#btn-state-yes").on("click", function () {
                // Gọi hàm thực hiện xóa bản ghi
                textObj.DeleteReader(memberID);
                // Đóng dialog
                dialogDeleteState.closeDialog();
                // Load lại dữ liệu trên bảng
                textObj.MakeDataFilter();
                //location.reload();
            });
            // Gán sự kiện cho nút NO 
            $("#btn-state-no").on("click", function () {
                dialogDeleteState.closeDialog();
            });
        }
       
        
    }

    // Hàm thực hiện gửi id về server và xóa bản ghi đó
    // Create by NVSON: 27/5/2019
    DeleteReader(memberID) {
        // Gọi Ajax để push id bản ghi về server
        var DeleteResult = {};
        $.ajax({
            url: "/readers/deleteReader/" + "{" + memberID + "}",
            type: "delete",
            dataType: "JSON",
            async: false,
            success: function (result) {
                DeleteResult = result;
            },
            error: function () {
                DeleteResult = result;
            }
        });
        
    }

     // Hàm xử lý load lại các bản ghi
    // Created by NVSON (5/5/2019)
    ReloadTable() {
        textObj.MakeDataFilter();
    }

    // ================ CÁC HÀM THỰC THI LIÊN QUAN DÊN FILTER, SORT ,PAGING ==========================

    // Hàm này dùng để quét tất cả các ô input filter 
    // Nếu value của ô input đó có giá trị thì thực hiện tạo đối tượng filter
    // Create by: NVSON 30/6/2019
    MakeFilterObject() {
        var listInput = $(".grid-one.show-grid .column-filter input");
        // Tạo một biến list Object Filter
        var listFilterObject = [];
        $.each(listInput, function (index, item) {
            var valueInput = $(item).val();
            if (valueInput !== "") {
                var filterObject = {};
                // Tên trường
                filterObject["Field"] = $(item).parent().parent().attr("fielddata");
                // Kiểu dữ liệu
                filterObject["DataType"] = $(item).parent().parent().attr("datatype");
                // Giá trị của chuỗi filter
                filterObject["Value"] = valueInput;
                // Kiểu lọc
                filterObject["Type"] = $(item).nextAll().find(".dropdown-item.dot").attr("filter");
                listFilterObject.push(filterObject);
            }
        });
        return listFilterObject;
    }

    // Quét tất cả  các th tạo truy vấn Sort
    // Create by: NVSON 30/6/2019
    MakeSortQuery() {
        // Mặc định chuỗi truy vấn là không sắp xếp
        var querySort = "(SELECT 1)" ;
        var elementSort = $(".grid-one.show-grid .column-title");
        $.each(elementSort, function (index, element) {
            var fieldName = $(element).parent().attr("fieldData");
            var stateSort = $(element).attr("msort");
            if (stateSort !== "normal") {
                switch (stateSort) {
                    case "up":
                        querySort = fieldName + ' ' + "ASC";
                        break;
                    case "down":
                        querySort = fieldName + ' ' + "DESC";
                        break;
                    default:
                        querySort = "(SELECT 1)";
                };
            }
        });
        return querySort;
    }

    // Tạo đối tượng filter và sort, paging để gửi request vế server
    // Create by: NVSON 20/6/2019
    MakeDataFilter(nameField, kindSort) {
        var Object = {};
        // Có phải là học sinh
        Object["IsStudent"] = textObj.ReaderState === "student" ? true : false;
        // Số index trang hiện tại
        Object["PageIndex"] = $(".grid-one.show-grid .current-display-page input").val();
        // Kích thước bản ghi của 1 trang
        Object["PageSize"] = $(".grid-one.show-grid .page-size input").val();
        // Mặc định Sort là normal
        Object["Sort"] = "(SELECT 1)";
        // Thực hiện gán chuỗi truy vấn sort với 2 parameter truyền vào
        if (nameField !== undefined & kindSort !== undefined) {
            Object["Sort"] = nameField + ' ' + kindSort;
        }
        // Nếu parameter sort truyền vào rỗng thì quét lại tất cả các trường xem có Sort trường nào không , có điều kiện sort thì gán chuỗi truy vấn
        else {
            Object["Sort"] = textObj.MakeSortQuery();
        }
        // Danh sách đối tượng filter (đem về server xử lý tiếp)
        Object["ListFilter"] = textObj.MakeFilterObject();
        if (Object.ListFilter.length > 0) {
            Object["PageIndex"] = 1;
            $(".grid-one.show-grid .current-display-page input").val(1);
        }
        // Gọi Ajax và attactdata
        debugger
        textObj.AttachDataToTableReader("/readers/getlistBookReaderFilter", Object);
    }

    // ============================ CÁC HÀM THỰC THI CHỨC NĂNG KHÁC =================================

    // Tạo highlight-tr và gọi các hàm thực thi liên quan
    // Created by: NVSON (05/05/2019)
    HightLightItem() {
        if ($(this).parent().hasClass('table-tbody-reader')) {
            $('.table-tbody-reader tr').removeClass("highlight-tr");
            $(this).addClass("highlight-tr");
            $(this).keypress(textObj.KeyUpKeyDownTableReader());
            // Gán dữ liệu phiểu mượn vào table lịch sử
            textObj.AttactDataBookToTableDetail();
        } else if ($(this).parent().hasClass('table-tbody-history')) {
            $('.table-tbody-history tr').removeClass("highlight-tr");
            $(this).addClass("highlight-tr");
            $(this).keypress(textObj.KeyUpKeyDownTableHistory());
        } else if ($(this).parent().hasClass('tbodyStudentTbl')) {
            $('.tbodyStudentTbl tr').removeClass("highlight-tr");
            $(this).addClass("highlight-tr");
            $(this).keypress(textObj.KeyUpKeyDownTableDialog());
        }
   
    }

    // Hàm xử lý sự kiện click select lựa chọn loại filter 
    // Created by: NVSON (05/05/2019)
    HandleSelectFilter() {
        var item = $(this);
        var parent = item.parentsUntil("th[fieldName]");
        parent.find("div.dropdown-item").removeClass("dot");
        item.addClass("dot");
        if (item.hasClass("remove-filter")) {
            parent.find("div.dropdown-item").removeClass("dot");
            item.next().addClass("dot");
            parent.find("input").val("");
        }
        textObj.MakeDataFilter();
    }

    // Hàm thay đổi fullname khi focus vào text input
    // Create by NVSON 11/5/2019
    GetFullName() {
        var fisrtName = $('#txtFirstName').val().trim();
        var lastName = $('#txtLastName').val().trim();
        $('#txtFullName').val(lastName + ' ' + fisrtName );
    }

    // Hàm mask input cho cho text box datetime
    // NVSON (22/5/2019)
    MaskInput() {
        var selector = $("#txtBirthday , #txtEffectDate, #txtDateAllocated, #txtExpireDate,.filter-birthday, .filter-dateallocated ,.filter-dateeffect, .filter-dateexpired, #dateAllocated-dialog2,#dateEffect-dialog2, #dateExpired-dialog2");
        var im = new Inputmask("99/99/9999");
        im.mask(selector);
    }

    // Hàm xử lý selectbox trên table footer (lựa chọn số bản ghi trên một trang)
    // NVSON (22/5/2019)
    HandleSelectPageSize() {
        var element = $(this).parent();
        var selection = $(element).find(".select-page-size");
        $(selection).toggle();
        $(selection).find('div').click(function () {
            $(selection).find('div').removeClass("page-size-click");
            $(this).addClass("page-size-click");
            $(element).find('.page-size input').val($(this).text());
            textObj.MakeDataFilter();
        });
    }
   
    // Hàm xử lý phím tắt
    // Created by: NVSON 28/5/2019
    HandleShortcutKey() {
        $(document).on("keydown", function () {
            // Ctrl + Alt + N : Mở dialog đăng kí bạn đọc
            if (event.ctrlKey && event.altKey && event.keyCode === 78) {
                textObj.RegistrationOnClick();
                event.preventDefault();
            }
            // Ctrl + E: Chức năng sửa bản ghi
            if (event.ctrlKey && event.keyCode === 69) {
                textObj.BindDataOnDialogEdit();
                event.preventDefault();
            }
            // Ctrl + D: Xóa bản ghi
            if (event.ctrlKey && event.keyCode === 68) {
                textObj.ClickButtonDelete();
                event.preventDefault();
            }
            // Ctrl + R: Nạp lại các bản ghi
            // Ctrl + H: Trợ giúp
        });
    }

    // Hàm xử lý key up key down trên bản ghi ở table bạn đọc
    // Create by: NVSON 29/5/2019
    KeyUpKeyDownTableReader() {
        window.onkeydown = function (event) {
            if (event.keyCode === 38) {
                // Trỏ tới bản ghi trước
                var prevRow = $(".table-tbody-reader .highlight-tr").prev();
                if (prevRow.parent().hasClass('table-tbody-reader')) {
                    // Xóa toàn bộ class highlight
                    $('.table-tbody-reader tr').removeClass("highlight-tr");
                    // Add class highlight vào bản ghi trước
                    prevRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
            if (event.keyCode === 40) {
                var nextRow = $(".table-tbody-reader .highlight-tr").next();
                if (nextRow.parent().hasClass('table-tbody-reader')) {
                    $('.table-tbody-reader tr').removeClass("highlight-tr");
                    nextRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
            // Gọi hàm xử lý bind dữ liệu vào bảng lịch sử mượn trả
            textObj.AttactDataBookToTableDetail();
        };
    }

    // Hàm xử lý key up key down trên bản ghi ở table lịch sử
    // Create by: NVSON 29/5/2019
    KeyUpKeyDownTableHistory() {
        window.onkeydown = function (event) {
            if (event.keyCode === 38) {
                // Trỏ tới bản ghi trước
                var prevRow = $(".table-tbody-history .highlight-tr").prev();
                if (prevRow.parent().hasClass('table-tbody-history')) {
                    $('.table-tbody-history tr').removeClass("highlight-tr");
                    prevRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
            if (event.keyCode === 40) {
                var nextRow = $(".table-tbody-history .highlight-tr").next();
                if (nextRow.parent().hasClass('table-tbody-history')) {
                    $('.table-tbody-history tr').removeClass("highlight-tr");
                    nextRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
        };
    }

    // Hàm xử lý key up key down trên bản ghi ở table dialog đăng kí bạn đọc từ danh sách học sinh
    // Create by: NVSON 29/5/2019
    KeyUpKeyDownTableDialog() {
        window.onkeydown = function (event) {
            if (event.keyCode === 38) {
                // Trỏ tới bản ghi trước
                var prevRow = $(".tbodyStudentTbl .highlight-tr").prev();
                if (prevRow.parent().hasClass('tbodyStudentTbl')) {
                    $('.tbodyStudentTbl tr').removeClass("highlight-tr");
                    prevRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
            if (event.keyCode === 40) {
                var nextRow = $(".tbodyStudentTbl .highlight-tr").next();
                if (nextRow.parent().hasClass('tbodyStudentTbl')) {
                    $('.tbodyStudentTbl tr').removeClass("highlight-tr");
                    nextRow.addClass('highlight-tr');
                    event.preventDefault();
                }
            };
        };
    }

    // Bắt sự kiện nhấn nút enter ở ô input để filter
    // Create by: NVSON 3/7/2019
    KeyPressFilterInput() {
        window.onkeydown = function (event) {
            if (event.keyCode === 13) {
                textObj.MakeDataFilter();
            };

        };
    }

    // Double click vào bản ghi và hiện dialog sửa bản ghi
    // Created by: NVSON 29/5/2019
    DoubleClickOnReader() {
        textObj.BindDataOnDialogEdit();
    }

    // Hàm xử lý context menu trên table bạn đọc
    // Create by: NVSON 15/6/2019
    HandleContextMenu() {
    
    }

    // Xử lý display none cho các button thêm sửa xóa khi không có dữ liệu trong grid master
    // Create by: NVSON 17/6/2019
    DisableButton() {
        if ($(".table-tbody-reader").children().length === 0) {
            $(".btnEdit,.btnDelete,.btnExport").addClass("disable-btn");
        } else {
            $(".btnEdit,.btnDelete,.btnExport").removeClass("disable-btn");
        }
    }

    // Hàm xử lý chuyển tab giữa các grid-student và grid-teacher
    // Create by: NVSON 20/6/2019
    HandleTabGrid() {
        $("#grid-reader-student, #grid-reader-teacher").removeClass("visible-grid");
        $(".grid-one").removeClass("show-grid");
        $(".grid-two").removeClass("show-grid");
        $(".btn-tab-active").removeClass("btn-tab-active");
        $(this).addClass("btn-tab-active");
        var valuebtn = $(this).attr("value");
        if (valuebtn === "student") {
            textObj.ReaderState = "student";
            $("#grid-reader-student").addClass("visible-grid");
            $("#grid-reader-student").find(".grid-one").addClass("show-grid");
            $("#grid-reader-student").find(".grid-two").addClass("show-grid");
        } else if (valuebtn === "teacher") {
            textObj.ReaderState = "teacher";
            $("#grid-reader-teacher").addClass("visible-grid");
            $("#grid-reader-teacher").find(".grid-one").addClass("show-grid");
            $("#grid-reader-teacher").find(".grid-two").addClass("show-grid");
        }
        textObj.MakeDataFilter();
    }
    
    // Xử lý sắp xếp bản ghi trên thead
    // NVSON: 26/6/2019
    SortDataReader() {
        var stateFilter = $(this).attr("msort");
        // Tên field
        var nameField = $(this).parent().attr("fieldData");
        // Loại sắp xếp (ASC|DESC)
        var kindSort;
        // Xác định xem filter ở grid nào
        if (typeof(stateFilter) !== "undefined") {
            // Đưa tất cả class ở span ở grid one về show-flter-nomal
            $(".grid-one .column-title").find("span").attr("class", "show-grid-normal");
            // Đưa tất cả các msort ở column-filter về normal
            $(".grid-one .column-title").attr("msort", "normal");
            switch (stateFilter) {
                case "normal":
                    $(this).find("span").attr("class", "show-filter-up");
                    $(this).attr("msort", "up");
                    kindSort = "ASC";
                    textObj.MakeDataFilter(nameField, kindSort);
                    break;
                case "up":
                    $(this).find("span").attr("class", "show-filter-down");
                    $(this).attr("msort", "down");
                    kindSort = "DESC";
                    textObj.MakeDataFilter(nameField, kindSort);
                    break;
                case "down":
                    $(this).find("span").attr("class", "show-filter-normal");
                    $(this).attr("msort", "normal");
                    textObj.MakeDataFilter();
                    break;
                default: 
                    $(this).find("span").attr("class", "show-filter-normal");
                    $(this).attr("msort", "normal");
                    textObj.MakeDataFilter();
                    break;
            }
            

        } else {
            // Nếu là ở grid detail thì lấy giá trị hsort 
            stateFilter = $(this).attr("hsort");
            // Đưa tất cả class ở span ở grid two về show-flter-nomal
            $(".grid-two .column-title").find("span").attr("class", "show-filter-normal");
            // Đưa tất cả các hsort ở column-filter về normal
            $(".grid-two .column-title").attr("hsort", "normal");
            switch (stateFilter) {
                case "normal":
                    $(this).find("span").attr("class", "show-filter-up");
                    $(this).attr("hsort", "up");
                    kindSort = "ASC";
                    textObj.SortDataBorrowingReader(nameField, kindSort);
                    break;
                case "up":
                    $(this).find("span").attr("class", "show-filter-down");
                    $(this).attr("hsort", "down");
                    kindSort = "DESC";
                    textObj.SortDataBorrowingReader(nameField, kindSort);
                    break;
                case "down":
                    $(this).find("span").attr("class", "show-filter-normal");
                    $(this).attr("hsort", "normal");
                    textObj.AttactDataBookToTableDetail();
                    break;
                default:
                    $(this).find("span").attr("class", "show-filter-normal");
                    $(this).attr("hsort", "normal");
                    textObj.AttactDataBookToTableDetail();
                    break;
            }
        }
        
    }

    // Sort bản ghi  ở grid grid detail 
    // ID của bản ghi bạn đọc, Tên trường, tăng hay giảm dần
    // Create by: NVSON 20/6/2019
    SortDataBorrowingReader(field, sort) {
        var element = $(".grid-one.show-grid .table-tbody-reader .highlight-tr");
        var IDReader = element.data().id;
        var url = "/readers/sortBorrowingReader/" + IDReader + "/" + field + "/" + sort + "";
        textObj.AttactDataBookToTableDetail(url);
    }

    // Xử lý Click trên input filter
    // Create by: NVSON 3/7/2019
    ClickInputFilter() {
        $(this).keypress(textObj.KeyPressFilterInput);
    }

    // Xử lý chuyển sang trang tiếp theo
    // Create by: NVSON 3/7/2019
    HandleNextPage() {
        debugger
        var stateNext = $(this).attr("class");
       // Trang hiện tại đang đứng
        var currentPage = Number($(".grid-one.show-grid .current-display-page input").val());
        // Tổng số trang
        var totalPage = Number($(".grid-one.show-grid .total-page")[0].innerText);
        // Khối next-on
        var nexton =  $(".grid-one.show-grid .next-on");
        // Khối next-off
        var nextoff = $(".grid-one.show-grid .next-off");
        // Khối prev-on
        var prevon = $(".grid-one.show-grid .prev-on");
        // Khối prev-off
        var prevoff = $(".grid-one.show-grid .prev-off");
        // Check xem có click next-last hay next-step
        if (stateNext === "next-last") {
            currentPage = totalPage;
        } else if (stateNext === "next-step") {
            currentPage++;
            if (currentPage > totalPage) {
                currentPage = totalPage;
            } else {
                currentPage = currentPage;
            }
        }
        // Check xem trang hiện tại đã phải là trang cuối cùng chưa
        if (currentPage === totalPage) {
            $(nexton).css("display", "none");
            $(nextoff).css("display", "block");
            $(prevon).css("display", "block");
            $(prevoff).css("display", "none");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        if (currentPage > 1 & currentPage < totalPage) {
            $(nexton).css("display", "block");
            $(nextoff).css("display", "none");
            $(prevon).css("display", "block");
            $(prevoff).css("display", "none");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        if (currentPage === 1) {
            $(nexton).css("display", "block");
            $(nextoff).css("display", "none");
            $(prevon).css("display", "none");
            $(prevoff).css("display", "block");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        textObj.MakeDataFilter();
    }

    // Xử lý chuyển đến trang trước đó
    // Create by: NVSON 3/7/2019
    HandlePreviousPage() {
        debugger;
        var statePrev= $(this).attr("class");
        // Trang hiện tại đang đứng
        var currentPage = Number($(".grid-one.show-grid .current-display-page input").val());
        // Tổng số trang
        var totalPage = Number($(".grid-one.show-grid .total-page")[0].innerText);
        // Khối next-on
        var nexton = $(".grid-one.show-grid .next-on");
        // Khối next-off
        var nextoff = $(".grid-one.show-grid .next-off");
        // Khối prev-on
        var prevon = $(".grid-one.show-grid .prev-on");
        // Khối prev-off
        var prevoff = $(".grid-one.show-grid .prev-off");
        
        // Check xem có click prev-last hay prev-step
        if (statePrev === "prev-last") {
            currentPage = 1;
        } else if (statePrev === "prev-step") {
            currentPage--;
            if (currentPage < 1) {
                currentPage = 1;
            } else {
                currentPage = currentPage;
            }
        }
        // Check xem trang hiện tại đã phải là trang cuối cùng chưa
        if (currentPage === totalPage) {
            $(nexton).css("display", "none");
            $(nextoff).css("display", "block");
            $(prevon).css("display", "block");
            $(prevoff).css("display", "none");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        if (currentPage > 1 & currentPage < totalPage) {
            $(nexton).css("display", "block");
            $(nextoff).css("display", "none");
            $(prevon).css("display", "block");
            $(prevoff).css("display", "none");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        if (currentPage === 1) {
            $(nexton).css("display", "block");
            $(nextoff).css("display", "none");
            $(prevon).css("display", "none");
            $(prevoff).css("display", "block");
            $(".grid-one.show-grid .current-display-page input").val(currentPage);
        }
        textObj.MakeDataFilter();
    }
}
// Khởi tạo đối tượng reader
// NVSON 22/5/2019
var reader = new Reader();

//============================ CÁC HÀM PHỤ KHÁC ===================================

// Ẩn selection khi click ra ngoài đối tượng
// NVSON 22/5/2019
$(document).on('click', function (event) {
    if (!$(event.target).hasClass('hide-on-click') && !$(event.target).hasClass('toggle-btn'))
        $('.hide-on-click').hide();
});

// Phần datetime picker cho dialog đăng kí bạn đọc từ danh sách học sinh
// Created by: NVSON (05/05/2019)
$("#dateAllocated-dialog2,#dateEffect-dialog2, #dateExpired-dialog2").datepicker({
    showOn: "button",
    buttonImage: "../Contents/icon/sprite.gif",
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    yearRange: '1950:2022'
});

// Tạo DateTime Picker cho các ô input trên dialog
$("#txtBirthday, #txtDateAllocated, #txtEffectDate, #txtExpireDate").datepicker({
    showOn: "button",
    buttonImage: "../Contents/icon/sprite.gif",
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    yearRange: '1950:2022'
});

// Tạo Datimepicker cho các ô input trên table master
// Created by: NVSON (05/05/2019)
$(".filter-birthday, .filter-dateallocated, .filter-dateeffect, .filter-dateexpired").datepicker({
    showOn: "button",
    buttonImage: "../Contents/icon/sprite.gif",
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    yearRange: '1950:2022'
});

//Hiện Menu chọn chức năng header
//NVSON 05/05/2019
$(".select-list-header").click(function () {
    event.stopPropagation();
    $(".list-menu-header").slideToggle("fast");
});
$("body").click(function () {
    $(".list-menu-header").slideUp("fast");
});

// Phần xử lý tab order trên dialog đăng kí bạn đọc
// NVSON 23/5/2019
$('#focus1').keyup(function (e) {
    if (e.keyCode === 9) $("#txtFirstAndMiddleName").focus();
});
//Shift tab
$('#txtFirstAndMiddleName').keydown(function (e) {
    if (e.shiftKey && e.keyCode === 9) $("#focus1").focus();
});