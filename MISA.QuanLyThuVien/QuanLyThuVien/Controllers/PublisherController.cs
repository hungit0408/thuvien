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

namespace QuanLyThuVien.Controllers
{
    [RoutePrefix("publishers")]

    public class PublisherController : ApiController
    {

        /// <summary>
        /// Khởi tạo một PublisherBL
        /// </summary>
        PublisherBL _publisherBL;


        /// <summary>
        /// Hàm lấy dữ liệu fake từ Model
        /// Created by: NVSON 15/5/2019
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getlistPublisher")]
        public AjaxResult GetListPublisher()
        {
            PublisherBL _publisherBL;
            var _result = new AjaxResult();
            try
            {
                _publisherBL = new PublisherBL();
                IEnumerable<Publisher> listPublisher;
                listPublisher = _publisherBL.BLGetData("[dbo].[Proc_Get_Publisher]");

                _result.Data = listPublisher;
                _result.Success = true;
            }
            catch (Exception e)
            {
                _result.Success = false;
                _result.Message = "Có lỗi hệ thống";
                _result.Message = e.Message;
            }
            return _result;
        }



        //[HttpGet]
        //[Route("getBookPublisher/{PublisherID}")]
        //public AjaxResult GetBookPublisher(Guid PublisherID)
        //{
        //    BaseBL<BookPublisher> _baseBL;
        //    var _result = new AjaxResult();
        //    Dictionary<string, object> dict = new Dictionary<string, object>();
        //    try
        //    {
        //        dict["BookReaderID"] = PublisherID;
        //        _baseBL = new BaseBL<BookPublisher>();
        //        IEnumerable<BookPublisher> listBookPublishers;
        //        listBookPublishers = _baseBL.BLGetDataBySpecificParameters("[dbo].proc_checkpublisher", dict);

        //        _result.Data = listBookPublishers;
        //        _result.Message = "Geting Data is Successful";
        //        _result.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        _result.Success = false;
        //        _result.Message = "Geting Data fail";
        //    }
        //    return _result;
        //}


        /// <summary>
        /// Chức năng xóa bản ghi dựa vào ID
        /// </summary>
        /// <param name="memberID"></param>
        /// <returns></returns>
        //[HttpDelete]
        //[Route("deletePublisher/{memberID}")]
        //public AjaxResult DeletePublisher(Guid memberID)
        //{
        //    var _result = new AjaxResult();
        //    Dictionary<string, object> dict = new Dictionary<string, object>();
        //    try
        //    {
        //        dict["PublisherID"] = memberID;
        //        _publisherBL = new PublisherBL();
        //        _publisherBL.DeletePublisher(dict);
        //        _result.Success = true;
        //        _result.Message = "Xóa thành công";
        //    }
        //    catch (Exception ex)
        //    {
        //        _result.Success = false;
        //        _result.Message = "Có lỗi đã xảy ra, thực hiện chức năng thất bại";
        //    }
        //    return _result;
        //}

    }

}