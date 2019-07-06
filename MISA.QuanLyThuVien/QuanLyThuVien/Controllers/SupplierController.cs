using QuanLyThuVien.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using MISA.Common;

namespace QuanLyThuVien.Controllers
{
    [RoutePrefix("suppliers")]
    public class SupplierController : ApiController
    {
        // GET: api/Supplier
        /// <summary>
        /// Lấy dữ nhà cung cấp
        /// </summary>
        /// <returns>Danh sách nhà cung cấp</returns>
        /// Created by BQLINH (13/5/2019)
        [HttpGet]
        [Route("")]
        public async Task<AjaxResult> Get()
        {
            var _result = new AjaxResult();
            try
            {
                await Task.Delay(200);
                _result.Success = true;
                _result.Message = "Thành công!";
                _result.Data = QLTHDB.ListSuppliers;

            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Có lỗi xảy ra! Vui lòng liên hệ MISA để được trợ giúp";
            }
            
            return _result;
        }

        // GET: api/Supplier/id
        /// <summary>
        /// Lấy dữ liệu nhà cung cấp có mã id
        /// </summary>
        /// <returns>Dữ liệu nhà cung cấp mã id</returns>
        /// Created by BQLINH (13/5/2019)
        [HttpGet]
        [Route("{supplierID}")]
        public Supplier Get(Guid supplierID)
        {
            var supplier = QLTHDB.ListSuppliers.Where(e => e.SupplierID == supplierID).FirstOrDefault();
            return supplier;
        }

        // POST: api/Supplier
        /// <summary>
        /// Post dữ liệu nhà cung cấp
        /// </summary>
        /// <returns>Kết quả thành công hay không</returns>
        /// Created by BQLINH (13/5/2019)
        [HttpPost]
        [Route("new")]
        public AjaxResult Post([FromBody]Supplier supplier)
        {
            var _result = new AjaxResult();
            try
            {
                supplier.SupplierID = Guid.NewGuid();
                supplier.Use = true;
                QLTHDB.ListSuppliers.Add(supplier);
                _result.Success = true;
                _result.Message = "Thêm thành công!";
            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Có lỗi xảy ra! Vui lòng liên hệ MISA để được trợ giúp";
            }
            return _result;
        }

        // POST: api/Supplier/id
        /// <summary>
        /// Sửa dữ liệu nhà cung cấp có mã id
        /// </summary>
        /// <returns>Danh sách nhà cung cấp đã sửa</returns>
        /// Created by BQLINH (13/5/2019)
        [HttpPost]
        [Route("edit")]
        public AjaxResult EditSupplier([FromBody]Supplier sup)
        {
            var _result = new AjaxResult();
            try
            {
                Supplier supplier = QLTHDB.ListSuppliers.Where(e => e.SupplierID == sup.SupplierID).FirstOrDefault();
              
                supplier.SupplierCode = sup.SupplierCode;
                supplier.SupplierName = sup.SupplierName;
                supplier.Address = sup.Address;
                supplier.TaxCode = sup.TaxCode;
                supplier.Note = sup.Note;
                supplier.Use = sup.Use;
                _result.Success = true;
                _result.Message = "Sửa thành công!";
            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Có lỗi xảy ra! Vui lòng liên hệ MISA để được trợ giúp";
            }
            return _result;
        }

        // DELETE: api/Supplier/id
        /// <summary>
        /// Xóa dữ liệu khách hàng có mã id
        /// </summary>
        /// <returns>Danh sách khách hàng đã xóa</returns>
        /// Created by BQLINH (22/04/2019)
        [HttpPost]
        [Route("delete/{supplierID}")]
        public AjaxResult SupplierDelete(Guid supplierID)
        {
            var _result = new AjaxResult();
            try
            {
                _result.Success = true;
                _result.Message = "Xóa thành công!";
                Supplier supplier = QLTHDB.ListSuppliers.Where(e => e.SupplierID == supplierID).FirstOrDefault();
                QLTHDB.ListSuppliers.Remove(supplier);

            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Có lỗi xảy ra! Vui lòng liên hệ MISA để được trợ giúp";
            }
            return _result;
        }

        // DELETE: api/Supplier
        /// <summary>
        /// Xóa tất cả dữ liệu khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng đã xóa</returns>
        /// Created by BQLINH (25/05/2019)
        [HttpPost]
        [Route("delete")]
        public AjaxResult SupplierDeleteAll()
        {
            var _result = new AjaxResult();
            try
            {
                _result.Success = true;
                _result.Message = "Xóa thành công!";
                QLTHDB.ListSuppliers.RemoveRange(0, QLTHDB.ListSuppliers.Count());

            }
            catch (Exception)
            {
                _result.Success = false;
                _result.Message = "Có lỗi xảy ra! Vui lòng liên hệ MISA để được trợ giúp";
            }
            return _result;
        }
    }
}