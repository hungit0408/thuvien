using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MISA.BL;
using MISA.BL.Dictionary;
using MISA.Entity;
using QuanLyThuVien.Models;
using MISA.Common;
using MISA.BL.Base;
using System.Text.RegularExpressions;

namespace QuanLyThuVien.Controllers
{
    [RoutePrefix("readers")]
    public class ReaderController : ApiController
    {
        /// <summary>
        /// Khởi tạo một BookReaderBL
        /// </summary>
        BookReaderBL _bookReaderBL;
        /// <summary>
        /// Khởi tạo một BorrowingBookReaderBL
        /// </summary>
        BorrowingBookReaderBL _borrowingBookReader;
       

        /// <summary>
        /// Hàm lấy dữ liệu bạn đọc học sinh
        /// Created by: NVSON 15/5/2019
        /// </summary>
        /// <returns></returns>  getlistStudentReader
        [HttpPost]
        [Route("getlistBookReaderFilter")]
        public AjaxResult GetListBookReader([FromBody]PagingSortAndFilter page)
        {
            var _result = new AjaxResult();
            Dictionary<string, object> dictParameter = new Dictionary<string, object>();
            _bookReaderBL = new BookReaderBL();
            try
            {
                dictParameter["PageSize"] = page.PageSize;
                dictParameter["PageIndex"] = page.PageIndex;
                dictParameter["Sort"] = page.Sort;
                dictParameter["IsStudent"] = page.IsStudent;
                if (page.ListFilter.Count > 0)
                {
                    dictParameter["Filter"] =  Filter.buildWhereFilterCondition(page.ListFilter);
                }
                else
                {
                    dictParameter["Filter"] = "";
                }
                BookReaderFilter bookReaderFilter;
                bookReaderFilter = _bookReaderBL.GetBookReaderFilter(dictParameter);
                _result.Data = bookReaderFilter;
                _result.Success = true;
            }
            catch (Exception ex)
            {
                _result.Success = false;
                _result.Message = "Có lỗi hệ thống";
                _result.Message = ex.Message;
            }
            return _result;
        }

        /// <summary>
        /// Hàm get phiếu mượn của mỗi bạn đọc dựa vào ID
        /// </summary>
        /// <returns></returns>
        /// Created by: NVSON 15/5/2019
        [HttpGet]
        [Route("getBorrowingBookReader/{BookReaderID}")]
        public AjaxResult GetBorrowingBookReader(Guid BookReaderID)
        {
            BaseBL<BorrowingBookReader> _baseBL;
            var _result = new AjaxResult();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                dict["BookReaderID"] = BookReaderID;
                _baseBL = new BaseBL<BorrowingBookReader>();
                IEnumerable<BorrowingBookReader> listBorrowingBookReaders;
                listBorrowingBookReaders = _baseBL.BLGetDataBySpecificParameters("[dbo].[Proc_Get_BorrowingBookReader]",dict);

                _result.Data = listBorrowingBookReaders;
                _result.Message = "Geting Data is Successful";
                _result.Success = true;
            }
            catch(Exception ex)
            {
                _result.Success = false;
                _result.Message = "Geting Data fail";
            }
            return _result;
        }

        /// <summary>
        /// Hàm nhận dữ liệu từ client à create một đối tượng bookreader
        /// Created by: NVSON 15/5/2019
        /// </summary>
        [HttpPost]
        [Route("insertReader")]
        public AjaxResult CreateReader([FromBody] BookReader readerJs)
        {
            var _result = new AjaxResult();
            _bookReaderBL = new BookReaderBL();
            try
            {
                // Check BookReaderID trùng hay không
                Dictionary<string, object> dict = new Dictionary<string, object>();
                dict["BookReaderCode"] = readerJs.BookReaderCode;
                List<BookReader> listReader = _bookReaderBL.SelectBookReaderByCode(dict);
                if (listReader.Count > 0)
                {
                    _result.Success = false;
                    _result.Message = "Mã thẻ " + readerJs.BookReaderCode + " đã được sử dụng. Vui lòng kiểm tra lại.";
                }
                else
                {
                    //Tiến hành Insert bản ghi
                    readerJs.CreatedDate = DateTime.Now;
                    readerJs.CreaterID = Guid.Parse("666C3824-0105-9E5B-B86B-0226A45DB0D2");
                    _bookReaderBL.AddNewBookReader(readerJs);
                    _result.Success = true;
                    _result.Message = "Cất thành công";
                }

            }
            catch (Exception ex)
            {
                _result.Success = false;
                _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
            }
            return _result;
        }

        /// <summary>
        /// Bind thông tin bản lên dialog sửa
        /// </summary>
        /// <param name="MemberID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getRecord/{MemberID}")]
        public AjaxResult GetReader([FromUri] Guid MemberID)
        {
            var _result = new AjaxResult();
            _bookReaderBL = new BookReaderBL();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                dict["BookReaderID"] = MemberID;
                // Lấy thông tin bản ghi dựa vào ID
                List<BookReader> listReader = _bookReaderBL.SelectBookReaderByID(dict);
                _result.Data = listReader;
                _result.Success = true;
                _result.Message = "Get bản ghi thành công";
            }
            catch
            {
                _result.Success = false;
                _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
            }
            return _result;
        }
        
       
        /// <summary>
        /// Hàm sửa bản ghi trong list
        /// </summary>
        /// <param name="readerJs"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("editReader")]
        public AjaxResult EditReader([FromBody] BookReader readerJs)
        {
            var _result = new AjaxResult();
            _bookReaderBL = new BookReaderBL();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                // Khởi tạo giá trị cho dictionary
                dict["BookReaderCode"] = readerJs.BookReaderCode;
                dict["BookReaderID"] = readerJs.BookReaderID;
                // Check trùng BookReaderCode ghi trước khi cho update
                List<BookReader> listReader = _bookReaderBL.SelectReaderByCodeAndDifferentID(dict);
                if (listReader.Count > 0)
                {
                    _result.Success = false;
                    _result.Message = "Mã thẻ "+readerJs.BookReaderCode+" đã được sử dụng. Vui lòng kiểm tra lại.";
                }
                else
                {
                    readerJs.ModifiedDate = DateTime.Now;
                    readerJs.CreaterID = Guid.Parse("666C3824-0105-9E5B-B86B-0226A45DB0D2");
                    int result = _bookReaderBL.UpdateBookReader(readerJs);
                    if(result > 0)
                    {
                        _result.Success = true;
                        _result.Message = "Cất thành công";
                    }
                    else
                    {
                        _result.Success = false;
                        _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
                    }
                   
                }
            }
            catch
            {
                _result.Success = false;
                _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
            }
            return _result;
        }

        /// <summary>
        /// Chức năng xóa bản ghi dựa vào ID
        /// </summary>
        /// <param name="memberID"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteReader/{memberID}")]
        public AjaxResult DeleteReader(Guid memberID)
        {
            var _result = new AjaxResult();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                dict["BookReaderID"] = memberID;
                _bookReaderBL = new BookReaderBL();
                _bookReaderBL.DeleteBookReader(dict);
                _result.Success = true;
                _result.Message = "Xóa thành công";
            }
            catch(Exception ex)
            {
                _result.Success = false;
                _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
            }
            return _result;
        }
        
        /// <summary>
        /// Chức năng sắp xếp lịch sử mượn trả
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("sortBorrowingReader/{bookReaderID}/{field}/{sort}")]
        public AjaxResult SortBorrowingBookReader(Guid bookReaderID, string field, string sort)
        {
            _borrowingBookReader = new BorrowingBookReaderBL();
            AjaxResult ajaxResult = new AjaxResult();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                dict["BookReaderID"] = bookReaderID;
                dict["Field"] = field;
                dict["Sort"] = sort;
                List<BorrowingBookReader> listBorrowingBookReader = _borrowingBookReader.SortBorrowingBookByField(dict);
                ajaxResult.Data = listBorrowingBookReader;
                ajaxResult.Success = true;
            }
            catch (Exception ex)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = "Có lỗi xảy ra khi sắp xếp"+ex;
            }
            return ajaxResult;
        }
    }
}
