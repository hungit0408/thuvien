using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entity
{
    /// <summary>
    /// Class Filter thực hiện tạo chuỗi truy vấn filter
    /// NVSON : 30/6/2019
    /// </summary>
    public class Filter
    {
        /// <summary>
        /// Tên trường cần lọc
        /// </summary>
        public string Field { get; set; }
        /// <summary>
        /// Kiểu so sánh hoặc kiểu lọc 
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Kiểu dữ liệu lọc đầu vào
        /// </summary>
        public string DataType { get; set; }
        /// <summary>
        /// Giá trị của đầu vào
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Hàm build chuỗi câu điều kiện where dựa vào kiểu dữ liệu lọc đầu vào ta có các kiểu lọc tương ứng
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public static string buildWhereFilterCondition(List<Filter> filters)
        {
            StringBuilder whereText = new StringBuilder();
            foreach (Filter item in filters)
            {
                switch (item.DataType)
                {
                    case "decimal":
                        whereText.AppendFormat("AND {0} {1} {2}", item.Field, item.Type, item.Value);
                        break;
                    case "int":
                        whereText.AppendFormat("AND {0} {1} {2}", item.Field, item.Type, item.Value);
                        break;
                    case "float":
                        whereText.AppendFormat("AND {0} {1} {2}", item.Field, item.Type, item.Value);
                        break;
                    case "date":
                        whereText.AppendFormat("AND {0} {1} '{2}'", item.Field, item.Type, item.Value);
                        break;
                    // Mặc định là kiểu string nếu không phải các kiểu trên
                    default:
                        whereText.Append(buildWhereFilterConditionForStringType(item));
                        break;
                }
            }
            return whereText.ToString();
        }

        public static string buildWhereFilterConditionForStringType(Filter filter)
        {
            string whereText = string.Empty;
            switch (filter.Type)
            {
                // Bằng
                case "=":
                    whereText = String.Format("AND {0} = N'{1}'", filter.Field, filter.Value);
                    break;
                // Bắt đầu với
                case "+":
                    whereText = String.Format("AND {0} LIKE N'{1}%'", filter.Field, filter.Value);
                    break;
                // Kết thúc với
                case "-":
                    whereText = String.Format("AND {0} LIKE N'%{1}'", filter.Field, filter.Value);
                    break;
                // Chứa
                case "!":
                    whereText = String.Format("AND {0} LIKE N'%{1}%'", filter.Field, filter.Value);
                    break;
                // Không chứa
                case "!=":
                    whereText = String.Format("AND {0} NOT LIKE N'%{1}%'", filter.Field, filter.Value);
                    break;
                // Khác
                case "#":
                    whereText = String.Format("AND {0} NOT LIKE N'{1}'", filter.Field, filter.Value);
                    break;
                // Trong
                case "*": //trống
                    whereText = String.Format(" AND IsNull({0}, '') = ''", filter.Field);
                    break;
                //không trống
                case "!*": 
                    whereText = String.Format(" AND IsNull({0}, '') <> ''", filter.Field);
                    break;
            }
            return whereText;
        }
    }
}
