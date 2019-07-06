using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DL.Base;
using MISA.Entity;

namespace MISA.DL.Dictionary
{
    public class PublisherDL: BaseDL<Publisher>
    {
        /// <summary>
        /// Thêm một nhà xuất bản
        /// </summary>
        /// <param name="publisher">thực thể entity</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        public int AddNewPublisher(Publisher publisher)
        {
            var storeName = "[dbo].[Proc_Add_Publisher]";
            return InsertUpdateData(storeName, publisher);
        }
        /// <summary>
        /// Xóa nhà xuất bản
        /// </summary>
        /// <param name="dictParameter"></param>
        /// <returns></returns>
        public int DeletePublisher(Dictionary<string, object> dictParameter)
        {
            var storeName = "[dbo].[Proc_Delete_Publisher]";
            return DeleteDataBySpecificParameters(storeName, dictParameter);
        }

        public List<Publisher> GetData(Dictionary<string, object> dict)
        {
            var storeName = "proc_checkpublisher";
            return GetDataBySpecificParameters(storeName,dict);
        }
        
    }
}
