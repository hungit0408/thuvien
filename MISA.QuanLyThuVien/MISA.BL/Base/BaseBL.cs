using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DL.Base;

namespace MISA.BL.Base
{
    public class BaseBL<T>
    {
        /// <summary>
        /// Khởi tạo BL
        /// </summary>
        protected BaseDL<T> baseDL;
        /// <summary>
        /// Khởi tạo constructor , trong đó khởi tạo luôn một baseBL
        /// </summary>
        public BaseBL()
        {
            baseDL = new BaseDL<T>();
        }

        /// <summary>
        /// Hàm Lấy dữ liệu từ DL
        /// </summary>
        /// <param name="procName"></param>
        /// <returns></returns>
        public IEnumerable<T> BLGetData(string procName)
        {
            return baseDL.GetData(procName);
        }

        /// <summary>
        /// Gọi hàm GetDataBySpecificParameters ở baseDL lấy bản ghi dựa vào các parameter và tên proc
        /// </summary>
        /// <param name="procName"></param>
        /// <param name="dicParameter"></param>
        /// <returns></returns>
        public IEnumerable<T> BLGetDataBySpecificParameters(string procName, Dictionary<string,object> dicParameter)
        {
            return baseDL.GetDataBySpecificParameters(procName, dicParameter);
        }

        /// <summary>
        /// Gọi hàm xóa dữ liệu ở DL 
        /// </summary>
        /// <param name="procName">Tên proc</param>
        /// <param name="dicParameter">Danh sách parameter</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        public int BLDeleteDataBySpecificParameters(string procName, Dictionary<string,object> dicParameter)
        {
            return baseDL.DeleteDataBySpecificParameters(procName, dicParameter);
        }
    }
}
