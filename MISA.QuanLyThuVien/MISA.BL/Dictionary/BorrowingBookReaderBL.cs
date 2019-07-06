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
    /// <summary>
    /// Thực hiện các thao tác logic với dữ liệu ở bảng phiếu mượn
    /// NVSON : 30/6/2019
    /// </summary>
    public class BorrowingBookReaderBL : BaseBL<BorrowingBookReader>
    {
        BorrowingBookReaderDL _borrowingBookReaderDL;
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        public BorrowingBookReaderBL()
        {
            _borrowingBookReaderDL = new BorrowingBookReaderDL();
        }
        /// <summary>
        /// Sắp xếp bản ghi tăng dần giảm dần theo từng trường đơn trong bảng phiểu mượn
        /// </summary>
        /// <returns>Danh sách phiểu mượn sort</returns>
        /// Created By: NVSON 30/6/2019
        public List<BorrowingBookReader> SortBorrowingBookByField(Dictionary<string, object> dictParameter)
        {
            return _borrowingBookReaderDL.SortReaderByField(dictParameter);
        }

      
    }
}
