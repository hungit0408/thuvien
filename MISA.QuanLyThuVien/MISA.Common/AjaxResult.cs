using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Common
{

    /// <summary>
    /// Class trả về kết quả cho ajax
    /// </summary>
    public class AjaxResult
    {
        /// <summary>
        /// Trả về kết quả thành công hay không
        /// Created by BQLINH (13/05/2019)
        /// </summary>
        public bool Success { get; set; }
        /// <summary>
        /// Thông báo nhận được
        /// Created by BQLINH (13/05/2019)
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Dữ liệu nhận được
        /// Created by BQLINH (13/05/2019)
        /// </summary>
        public object Data { get; set; }

    }
}
