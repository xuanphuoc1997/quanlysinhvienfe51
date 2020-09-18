//Khai báo service
var svService = new SinhVienService();


var layThongTinSinhVien = function () {
    var promise = svService.layDanhSachSinhVien(); //Gọi service lấy dữ liệu từ backend về 
    promise.then(function (result) { //Hàm xử lý khi kết quả trả về thành công
        // console.log(result.data);
        var content = '';
        //Từ dữ liệu table 
        for (var i = 0; i < result.data.length; i++) {
            //Lấy ra từng sinh viên từ kết quả server trả về
            var sv = result.data[i];
            //Tạo đối tượng sinhVien chứa dữ liệu đó 
            var sinhVien = new SinhVien();
            sinhVien.maSinhVien = sv.maSinhVien;
            sinhVien.tenSinhVien = sv.tenSinhVien;
            sinhVien.email = sv.email;
            sinhVien.diemToan = sv.diemToan;
            sinhVien.diemLy = sv.diemLy;
            sinhVien.diemHoa = sv.diemHoa;
            sinhVien.loaiSinhVien = sv.loaiSinhVien;
            sinhVien.diemRenLuyen = sv.diemRenLuyen;
            content += `<tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xóa</button>
                
                <button class="btn btn-primary mr-1" onclick="chinhSua('${sv.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>`
        }
        document.getElementById('tblSinhVien').innerHTML = content;
    }).catch(function(err) {
        console.log(err.response.data)
    })

}
layThongTinSinhVien()

//------------------POST: Chức năng thêm sinh viên vào server ---------------

document.getElementById('btnThemSinhVien').onclick = function () {
    //Lấy thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById('maSinhVien').value;
    sv.tenSinhVien = document.getElementById('tenSinhVien').value;
    sv.email = document.getElementById('email').value;
    sv.diemToan = document.getElementById('diemToan').value;
    sv.diemLy = document.getElementById('diemLy').value;
    sv.diemHoa = document.getElementById('diemHoa').value;
    sv.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sv.loaiSinhVien = document.getElementById('loaiSinhVien').value;
    console.log('sinhVien', sv)

    //Tạo ra object backend cần
    // var objectModel = {
    //     "maSinhVien": sv.maSinhVien,
    //     "tenSinhVien": "string",
    //     "loaiSinhVien": "string",
    //     "diemToan": 0,
    //     "diemLy": 0,
    //     "diemHoa": 0,
    //     "diemRenLuyen": 0,
    //     "email": "string"
    //   }

    // var themSVThanhCong = function (result) {
    //     console.log(result.data)
    // }

    axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //link BE cung cấp
        method:'POST', //phương thức BE cung cấp
        data:sv //Theo định dạng BE yêu cầu
    }).then(function (result) {
        console.log("Kết quả",result.data)
        //Cách 1: location.reload => load lại file script => gọi api lấy danh sách sinh viên mới về lại.
        // location.reload();
        //Cách 2: Gọi lại api layDanhSachSinhVien tại đây
        layThongTinSinhVien();
    }).catch(function(err){
        console.log("Kết quả",err.response.data)

    })
}



var xoaSinhVien = function (maSinhVien) {
    
    //Gọi api từ backend => trả promise
    var promise = svService.xoaSinhVien(maSinhVien);
    //Dùng promise xử lý thành công hoặc thất bại
    promise.then(function (result){
        console.log(result.data);
        
        //Load lại api thấy thông tin sinh viên
        layThongTinSinhVien();

    }).catch(function(err) {
        console.log(err.response.data)
    });

}


var chinhSua = function (maSinhVien) {

    //Gọi api lấy về thông tin  sinh viên từ server dựa vào mã
   var promise = svService.layThongtinSinhVien(maSinhVien);

   promise.then(function(result) {
    //Lấy về thành công => Gán dữ liệu lên các thẻ input
    var sinhVien = result.data;

    document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
    document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
    document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
    document.getElementById('email').value = sinhVien.email;
    document.getElementById('diemToan').value = sinhVien.diemToan;
    document.getElementById('diemLy').value = sinhVien.diemLy;
    document.getElementById('diemHoa').value = sinhVien.diemHoa;
    document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;


   }).catch(function (error) {

   })


}


document.getElementById('btnCapNhatSinhVien').onclick = function(){
    //Lấy thông tin sinh viên từ người dùng sau khi đã chỉnh sửa

    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    sinhVienUpdate.email = document.getElementById('email').value;
    sinhVienUpdate.diemToan = document.getElementById('diemToan').value;
    sinhVienUpdate.diemLy = document.getElementById('diemLy').value;
    sinhVienUpdate.diemHoa = document.getElementById('diemHoa').value;
    sinhVienUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    sinhVienUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;

    //Gọi api cập nhật sinh viên từ BE cung cấp
    var promise = svService.capNhatThongTinSinhVien(sinhVienUpdate.maSinhVien,sinhVienUpdate);

    promise.then(function(result) {
        console.log(result.data)
        //Xử lý khi cập nhật thành công
        layThongTinSinhVien();
    }).catch(function(err) {
        console.log(err.response.data);
    })

}
