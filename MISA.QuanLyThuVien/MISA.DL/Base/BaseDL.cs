using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using MISA.Entity;
namespace MISA.DL.Base
{
    public class BaseDL<T>
    {
        /// <summary>
        /// Lấy dữ liệu từ DB
        /// </summary>
        /// <param Tên Proseduce="storeName"></param>
        /// <returns>Danh sách bản ghi</returns>
        /// Created by: NVSON 22/6/2019
        public List<T> GetData(string storeName)
        {
            var entities = new List<T>();
            using (DataAccess dataAccess = new DataAccess())
            {
                SqlDataReader sqlDataReader = dataAccess.ExcuteReader(storeName);
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        //Lấy ra tên propertyName dựa vào tên cột của field hiện tại
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho property tương ứng
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }
                    }
                    entities.Add(entity);
                }
            }
            return entities;
        }

        /// <summary>
        /// Lấy bản ghi dựa vào các parameter và tên proc
        /// </summary>
        /// <param name="storeName">Tên procedure</param>
        /// <param name="dicProperty">Một dictionary chứa các tham số theo dạng key-value truyền vào proc</param>
        /// <returns>Danh sách bản ghi</returns>
        /// Created by: NVSON 22/6/2019
        public List<T> GetDataBySpecificParameters(string storeName, Dictionary<string, object> dicProperty)
        {
            SqlDataReader sqlDataReader;
            using (DataAccess dataAccess = new DataAccess())
            {
                // Gọi SqlCommand
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                // Lấy toàn bộ parameter trong storeprocedure
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;

                // Vòng lặp khởi tạo giá trị cho các parameter trong trong store
                foreach (SqlParameter parameter in parameters)
                {
                    // Lấy tên parameter trong store
                    var paramName = parameter.ToString().Replace("@", string.Empty);

                    // Lấy ra giá trị của property trong Array
                    // Check xem có property nào trùng với paramName không và lấy dữ liệu
                    if (dicProperty.TryGetValue(paramName, out object result))
                    {
                        var property = result;
                        // Tất cả các value của parameter đều là object
                        parameter.Value = property != null ? property : DBNull.Value;
                    }
                    else
                    {
                        parameter.Value = DBNull.Value;
                    }
                }

                // Thực thi SqlDataReader để lấy ra các bản ghi
                sqlDataReader = sqlCommand.ExecuteReader();
                var entities = new List<T>();
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên của propertyName dựa vào tên cột của Field hiện tại
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);
                        }// Chỗ này cần check thêm
                    }
                    entities.Add(entity);
                }
                sqlDataReader.Close();
                return entities;
            }
        }

        /// <summary>
        /// Get dữ liệu bạn đọc sau khi filter , sx, và paging
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="dicProperty"></param>
        /// <returns></returns>
        public BookReaderFilter GetBookReaderByFilterSortAndPaging(string storeName, Dictionary<string, object> dicProperty)
        {
            SqlDataReader sqlDataReader;
            BookReaderFilter bookReaderFilter = new BookReaderFilter();
            using (DataAccess dataAccess = new DataAccess())
            {
                // Gọi SqlCommand
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                // Lấy toàn bộ parameter trong storeprocedure
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;

                // Vòng lặp khởi tạo giá trị cho các parameter trong trong store
                foreach (SqlParameter parameter in parameters)
                {
                    // Lấy tên parameter trong store
                    var paramName = parameter.ToString().Replace("@", string.Empty);

                    // Lấy ra giá trị của property trong Array
                    // Check xem có property nào trùng với paramName không và lấy dữ liệu
                    if (dicProperty.TryGetValue(paramName, out object result))
                    {
                        var property = result;
                        // Tất cả các value của parameter đều là object
                        parameter.Value = property != null ? property : DBNull.Value;
                    }
                    else
                    {
                        parameter.Value = DBNull.Value;
                    }
                }

                // Thực thi SqlDataReader để lấy ra các bản ghi
                sqlDataReader = sqlCommand.ExecuteReader();
                List<BookReader> listBookReader = new List<BookReader>();
                while (sqlDataReader.Read())
                {
                    BookReader bookReader = new BookReader();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên của propertyName dựa vào tên cột của Field hiện tại
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = bookReader.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(bookReader, propertyValue);
                        }// Chỗ này cần check thêm
                    }
                    listBookReader.Add(bookReader);
                }
                sqlDataReader.Close();
                bookReaderFilter.TotalPage = (int)sqlCommand.Parameters["@TotalPage"].Value;
                bookReaderFilter.TotalRecord = (int)sqlCommand.Parameters["@TotalRecord"].Value;
                bookReaderFilter.ListBookReaderFilter = listBookReader;
                return bookReaderFilter;
            }
        }

        /// <summary>
        /// Xóa bản ghi trong bảng
        /// </summary>
        /// <param name="storeName">Tên store</param>
        /// <param name="dicProperty">Danh sách parameter truyề vào dạng key-value</param>
        /// <returns>Số bản ghi bị ảnh hưởng</returns>
        public int DeleteDataBySpecificParameters(string storeName, Dictionary<string, object> dicProperty)
        {
            int result = 0;
            using (DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                // Lấy tất cả các parameter trong store
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                // Khởi tạo transaction 
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;
                try
                {
                    // Vòng lặp gán giá trị cho parameter trong store
                    foreach (SqlParameter parameter in parameters)
                    {
                        // Lấy tên parameter trong store
                        var paramName = parameter.ToString().Replace("@", string.Empty);

                        // Lấy ra giá trị của property trong Array
                        // Check xem có property nào trùng với paramName không và lấy dữ liệu
                        if (dicProperty.TryGetValue(paramName, out object paramValue))
                        {
                            var property = paramValue;
                            // Tất cả các value của parameter đều là object
                            parameter.Value = property != null ? property : DBNull.Value;
                        }
                        else
                        {
                            parameter.Value = DBNull.Value;
                        }
                    }
                    result = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception)
                {
                    sqlTransaction.Rollback();
                }
                return result;
            }
        }
      
        /// <summary>
        /// Hàm Insert data vào bảng  hoặc Update data
        /// </summary>
        /// <param name="storeName">Tên store</param>
        /// <param name="entity">Tên thực thể</param>
        /// <returns></returns>
        public int InsertUpdateData(string storeName, T entity)
        {
            int result = 0;
            using(DataAccess dataAccess = new DataAccess())
            {
                var sqlCommand = dataAccess.SqlCommand;
                sqlCommand.CommandText = storeName;
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                // Khởi tạo Transition 
                SqlTransaction sqlTransaction= sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;
                try
                {
                    // Gán giá trị cho parameter trong store
                    foreach (SqlParameter parameter in parameters)
                    {
                        var paramName = parameter.ToString().Replace("@", string.Empty);
                        // Lấy ra property của entity T
                        var property = entity.GetType().GetProperty(paramName);
                        if (property != null)
                        {
                            // Lấy giá trị của property trong entity
                            var paramValue = property.GetValue(entity);
                            parameter.Value = paramValue != null ? paramValue : DBNull.Value;
                        }
                        else
                        {
                            parameter.Value = DBNull.Value;
                        }
                    }
                    // Tiến hành execute procecure
                    result = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                }
                catch (Exception ex)
                {
                    sqlTransaction.Rollback();
                    var loi = ex.Message;
                    result = 0;
                }
                return result;
            }
        }

    }
}