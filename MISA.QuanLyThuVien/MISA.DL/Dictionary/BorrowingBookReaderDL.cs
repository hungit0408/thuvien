using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entity;
using MISA.DL.Base;

namespace MISA.DL.Dictionary
{
    /// <summary>
    /// Thao tác dữ liệu với 3 bảng bạn đọc, phiểu mượn, sách
    /// </summary>
    public class BorrowingBookReaderDL : BaseDL<BorrowingBookReader>
    {
        /// <summary>
        /// Sắp xếp bản ghi tăng dần giảm dần theo từng trường đơn trong lịch sử mượn trả
        /// </summary>
        /// <returns></returns>
        public List<BorrowingBookReader> SortReaderByField(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Sort_BorrowingBookReader]";
            return GetDataBySpecificParameters(storeName, dictParameter);
        }
    }
}
