using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{

    public class PagingSortAndFilter
    {
        /// <summary>
        /// Số trang hiện tại
        /// </summary>
        public int PageIndex { get; set; }
        /// <summary>
        /// Số bản ghi trong một trang
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// Biểu thức sắp xếp
        /// </summary>
        public string Sort { get; set; }
        /// <summary>
        /// Có phải là học sinh
        /// </summary>
        public bool IsStudent { get; set; }
        /// <summary>
        /// List các đối tượng filter
        /// </summary>
        public List<Filter> ListFilter { get; set; }
    }
}
