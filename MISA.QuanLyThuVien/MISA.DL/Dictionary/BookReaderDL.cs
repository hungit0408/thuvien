using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DL.Base;
using MISA.Entity;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Thực hiện các thao tác dữ liệu liên quan đến BookReader
    /// </summary>
    public class BookReaderDL : BaseDL<BookReader>
    {


        /// <summary>
        /// Lấy toàn bộ danh sách bạn đọc sau khi đã lọc, sắp xếp, và phân trang
        /// </summary>
        /// <param name="dictParameter">Danh sách tham số truyền vào</param>
        /// <returns></returns>
        public BookReaderFilter GetBookReaderFilter(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_SortFilterAndPaging_BookReader]";
            return GetBookReaderByFilterSortAndPaging(storeName, dictParameter);
        }

        /// <summary>
        /// Thêm một bạn đọc mới
        /// </summary>
        /// <param name="bookreader">thực thể entity</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        public int AddNewBookReader(BookReader bookReader)
        {
            var storeName = "[dbo].[Proc_Add_BookReader]";
            return InsertUpdateData(storeName, bookReader);
        }

        /// <summary>
        /// Xóa bạn đọc
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns></returns>
        public int DeleteBookReader(Dictionary<string,object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Delete_BookReader]";
            return DeleteDataBySpecificParameters(storeName, dictParameter);
        }

        /// <summary>
        /// Lấy ra book reader dựa vào mã code bạn đọc
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns></returns>
        public List<BookReader> SelectBookReaderByCode(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Select_BookReader_ByCode]";
            return GetDataBySpecificParameters(storeName, dictParameter);
        }

        /// <summary>
        /// Lấy ra book reader dựa vào mã ID của bạn đọc
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns></returns>
        public List<BookReader> SelectBookReaderByID(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Select_BookReader_ByID]";
            return GetDataBySpecificParameters(storeName, dictParameter);
        }

        /// <summary>
        /// Lấy bạn đọc dựa vào mã Code và khác mã ID truyền vào
        /// Mục địch để check trùng mã lúc edit bản ghi
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns></returns>
        public List<BookReader> SelectReaderByCodeAndDifferentID(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Check_BookReaderByCodeAndID]";
            return GetDataBySpecificParameters(storeName, dictParameter);
        }

        /// <summary>
        /// Update bạn đọc 
        /// </summary>
        /// <param name="bookReader"></param>
        /// <returns></returns>
        public  int UpdateBookReader(BookReader bookReader)
        {
            var storeName = "[dbo].[Proc_Update_BookReader]";
            return InsertUpdateData(storeName, bookReader);
        }

        ///// <summary>
        ///// Sắp xếp bản ghi tăng dần giảm dần theo từng trường đơn
        ///// </summary>
        ///// <returns></returns>
        //public List<BookReader> SortReaderByField(Dictionary<string, object> dictParameter)
        //{
        //    var storeName = "[dbo].[Proc_Sort_BookReader]";
        //    return GetDataBySpecificParameters(storeName, dictParameter);
        //}
       
    }
}
