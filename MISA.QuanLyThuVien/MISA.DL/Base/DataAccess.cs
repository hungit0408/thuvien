using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace MISA.DL.Base
{
    public class DataAccess : IDisposable
    {
        #region Khai báo các đối tượng ADO 

        protected SqlConnection _sqlConnection;
        protected SqlCommand _sqlCommand;
        protected string _connectionString;

        public SqlCommand SqlCommand
        {
            get { return _sqlCommand; }
        }

        public SqlConnection SqlConnection
        {
            get { return _sqlConnection; }
        }
        #endregion

        #region Các hàm thực thi kết nối, thực thi, hủy kết nối
        /// <summary>
        /// Hàm khởi tạo DataAccess
        /// </summary>
        /// Created by: NVSON()
        public DataAccess()
        {
            _connectionString = @"Data Source=database\sql2014;Initial Catalog=MISAQLTH02_Development;Integrated Security=True";
            // Khởi tạo đối tượng SqlConnection 
            _sqlConnection = new SqlConnection(_connectionString);

            // Khởi tạo đối tượng SqlCommand
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;

            // Mở kết nối
            _sqlConnection.Open();
        }

        /// <summary>
        /// Hàm thực thi ExcuteReader của SqlCommand
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns>Trả về một tập hợp các dòng</returns>
        /// Created by: NVSON()
        public SqlDataReader ExcuteReader(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteReader();
        }

        /// <summary>
        /// Hàm thực thi ExcuteNonQuery của SqlCommand
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns>Trả về số dòng bị ảnh hưởng</returns>
        /// Created by: NVSON()
        public int ExcuteNonQuery(string commanText)
        {
            _sqlCommand.CommandText = commanText;
            return _sqlCommand.ExecuteNonQuery();
        }

        /// <summary>
        /// Hàm thực thi ExcuteScalar của SqlCommand
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns>Trả về một object</returns>
        /// Created by: NVSON()
        public object ExcuteScalar(string commandText)
        {
            _sqlCommand.CommandText = commandText;
            return _sqlCommand.ExecuteScalar();
        }


        /// <summary>
        /// Hàm hủy kết nối 
        /// </summary>
        /// Created by: NVSON()
        public void Dispose()
        {
            _sqlConnection.Close();
        }
        #endregion
    }
}
