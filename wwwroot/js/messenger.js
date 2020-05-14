var dataTable;

$(document).ready(function () {
    var url = window.location.search;
    if (url.includes("shipping")) {
        loadDataTable("GetAllShippingOrders");
    }
    else {
        if (url.includes("pending")) {
            loadDataTable("GetAllPendingOrders");
        }
        else {
            loadDataTable("GetAllHistory");
        }

    }
});

function loadDataTable(url) {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Messenger/" + url,
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "deliveryId" },
            { "data": "pleaseShipping" },
            { "data": "addressDetails" },
            { "data": "contactName" },
            { "data": "contactTel" },
            { "data": "deliveryDeadline" 
                },
            {
                "data": "deliveryId",
                "render": function (data, type, row) {
                    if (row.deliveryStatusId == 3) {
                        return `<div> 
                                <a href="/Messenger/Confirm/${data}" class='btn btn-sm btn-primary' >
                                    <i class='fas fa-check-square'></i> รับงาน
                                </a>
                                <a  href="/Messenger/NoConfirm/${data}" class='btn btn-sm btn-danger' >
                                   <i class='fas fa-window-close'></i> ไม่รับงาน
                                </a>
                                <a  href="/Messenger/PdfExport/${data}" class='btn btn-sm btn-dark' >
                                   <i class='fas fa-print'></i> พิมพ์
                                </a>
                            </div>`;
                    }
                    if (row.deliveryStatusId == 4) {
                        return `<div> 
                                <a href="/Messenger/Successful/${data}" class='btn btn-sm btn-success' >
                                    <i class='fas fa-check-square'></i> ส่งสำเร็จ
                                </a>
                                <a  href="/Messenger/NoSuccessful/${data}" class='btn btn-sm btn-danger' >
                                   <i class='fas fa-window-close'></i> ไม่สำเร็จ
                                </a>
                                <a  href="/Messenger/PdfExport/${data}" class='btn btn-sm btn-dark' >
                                   <i class='fas fa-print'></i> พิมพ์
                                </a>
                            </div>`;
                    }

                }, "width": "15%"
            }
        ],
        "language": {
            "emptyTable": "No records found."
        },
        "width": "100%"
    });
}



//{
//    "data": "status",
//        render: function(data, type, row) {
//            if (data == 0) { return '<label for=\"status\" id="lblstatus" class="label label-warning">InActive</label>'; }
//            if (data == 1) { return '<label for=\"status\" id="lblstatus" class="label label-success">Active</label>'; }
//            if (data == 2) { return '<label for=\"status\" id="lblstatus" class="label" style="background-color:red;">Deleted</label>'; }
//        }
//},


