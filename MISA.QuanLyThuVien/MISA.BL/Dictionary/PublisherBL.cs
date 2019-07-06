using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.BL.Base;
using MISA.Entity;
using MISA.DL.Dictionary;



namespace MISA.BL.Dictionary
{
    public class PublisherBL: BaseBL<Publisher>
    {
        PublisherDL _publisherDL;
        /// <summary>
        /// Hàm khởi tạo 
        /// Khi khởi tạo một BL thì sẽ khởi tạo luôn 1 DL tương ứng
        /// </summary>
        /// Created By: NVSON 24/6/2019
        public PublisherBL()
        {
            _publisherDL = new PublisherDL();
        }

        /// <summary>
        /// Gọi DL xóa bản ghi
        /// </summary>
        /// <param name="dict"></param>
        /// <returns>Số bản ghi ảnh hưởng</returns>
        /// Created By: NVSON 24/6/2019
        public int DeletePublisher(Dictionary<string, object> dict)
        {
            return _publisherDL.DeletePublisher(dict);
        }

        /// <summary>
        /// Thêm mới bạn đọc
        /// </summary>
        /// <param name="bookReader">entity</param>
        /// <returns>Số bản ghi ảnh hưởng</returns>
        /// Created By: NVSON 24/6/2019
        //public int AddNewBookReader(Publisher publisher)
        //{
        //    return _publisherDL.AddNewBookReader(publisher);
        //}

        /// <summary>
        /// Select các bản ghi bạn đọc dựa vào mã code
        /// </summary>
        /// <param name="dicParameter"></param>
        /// <returns></returns>
        /// Created By: NVSON 24/6/2019
        //public List<BookReader> SelectBookReaderByCode(Dictionary<string, object> dicParameter)
        //{
        //    return _bookReaderDL.SelectBookReaderByCode(dicParameter);
        //}

        /// <summary>
        /// Select các bản ghi bạn đọc dựa vào ID
        /// </summary>
        /// <param name="dicParameter"></param>
        /// <returns></returns>
        /// Created By: NVSON 24/6/2019
        //public List<BookReader> SelectBookReaderByID(Dictionary<string, object> dicParameter)
        //{
        //    return _bookReaderDL.SelectBookReaderByID(dicParameter);
        //}

        /// <summary>
        /// Lấy bạn đọc dựa vào Code và khác mã ID truyền vào
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns>List bạn đọc</returns>
        //public List<BookReader> SelectReaderByCodeAndDifferentID(Dictionary<string, object> dictParameter)
        //{
        //    return _bookReaderDL.SelectReaderByCodeAndDifferentID(dictParameter);
        //}

        /// <summary>
        /// Cập nhật bản ghi bạn đọc
        /// </summary>
        /// <param name="bookReader"></param>
        /// <returns></returns>
        /// Created By: NVSON 24/6/2019
        //public int UpdateBookReader(BookReader bookReader)
        //{
        //    return _bookReaderDL.UpdateBookReader(bookReader);
        //}
    }
}
