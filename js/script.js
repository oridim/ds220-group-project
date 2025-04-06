document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {
    });
});

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

Title = document.getElementById("title");
CustomerApp = document.getElementById("app-customer");
SalesRepApp = document.getElementById("app-sales-rep");
CustomerView = document.getElementById("customer-view");
SalesRepView = document.getElementById("sales-rep-view");
CustomerButton = document.getElementById("customer-button");
SalesButton = document.getElementById("sales-button");
BackButton = document.getElementById("back-button");
AddInvoiceButton = document.getElementById("add-invoice-button");
CustomerIDInput = document.getElementById("customer-id-input");
SalesRepIDInput = document.getElementById("rep-id-input");
InventoryFilterInput = document.getElementById("inventory-filter");
InventoryPurchasedCheckbox = document.getElementById("inventory-purchased-checkbox");

var CustomerInventoryTable = new Tabulator(`#inventory-table`, {
    layout: "fitColumns",
    height: "300",
    columns: [
        { title: "Product ID", field: "product_id", width: 150, hozAlign: "right", headerHozAlign: "right" },
        { title: "Product", field: "product_name" },
        { title: "Vendor", field: "vendor_name" },
        { title: "Vendor ID", field: "vendor_id", width: 150, hozAlign: "left", headerHozAlign: "left" },
    ],
});

var CustomerInvoicesTable = new Tabulator(`#customer-invoice-table`, {
    layout: "fitColumns",
    height: "fitData",
    columns: [
        { title: "Invoice ID", field: "invoice_id", width: 150, hozAlign: "right", headerHozAlign: "right" },
        { title: "Sales Representative", field: "rep_fullname", formatter: function (cell) {
                const data = cell.getData();
                return `${data.rep_firstname} ${data.rep_lastname}`;
            } },
        { title: "Sales Rep ID", field: "rep_id", width: 150, hozAlign: "left", headerHozAlign: "left" },
    ],
});

var SalesRepInvoiceTable = new Tabulator(`#rep-invoices-table`, {
    layout: "fitColumns",
    height: "fitData",
    columns: [
        { title: "Invoice ID", field: "invoice_id", width: 150, hozAlign: "right", headerHozAlign: "right" },
        { title: "Customer", field: "customer_fullname", formatter: function (cell) {
                const data = cell.getData();
                return `${data.customer_firstname} ${data.customer_lastname}`;
            } },
        { title: "Customer ID", field: "customer_id", width: 150, hozAlign: "left", headerHozAlign: "left" },
    ],
});

var DetailLineTable = new Tabulator(`#detail-line-table`, {
    layout: "fitColumns",
    height: "fitData",
    columns: [
        { title: "Product ID", field: "product_id", width: 150, hozAlign: "right", headerHozAlign: "right" },
        { title: "Product Name", field: "product_name" },
        { title: "Vendor Name", field: "vendor_name" },
        { title: "Vendor ID", field: "vendor_id", width: 150, hozAlign: "left", headerHozAlign: "left" },
        { title: "Quantity", field: "quantity", width: 150, hozAlign: "right", headerHozAlign: "right" },
    ],
});

InventoryFilterInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    CustomerInventoryTable.setFilter(function (data, filterParams) {
        return (
            data.vendor_name.toLowerCase().includes(keyword) ||
            data.product_name.toLowerCase().includes(keyword)
        );
    });
});

InventoryPurchasedCheckbox.addEventListener("change", function() {
    getAllProducts(CustomerIDInput.value);
    CustomerInventoryTable.clearFilter();
});

function show(app) {
    if (app === "main") {
        Title.innerText = "PowerSales";
        CustomerApp.classList.add("hidden");
        SalesRepApp.classList.add("hidden");
        CustomerButton.classList.remove("hide");
        SalesButton.classList.remove("hide");
        BackButton.classList.add("hide");
        AddInvoiceButton.classList.add("hide");
        CustomerIDInput.value = "";
        SalesRepIDInput.value = "";
        clearTables()

    } else {
        CustomerApp.classList.add("hidden");
        SalesRepApp.classList.add("hidden");
        CustomerButton.classList.add("hide");
        SalesButton.classList.add("hide");
        BackButton.classList.remove("hide");

        document.getElementById(app).classList.remove("hidden");

        switch(app) {
            case "app-customer":
                Title.innerText = "Customer View";
                break;
            case "app-sales-rep":
                Title.innerText = "Sales Representative View";
                AddInvoiceButton.classList.remove("hide");
                break;
        }
    }
}

// Only used for API calls, everything else should be instant
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

async function getAllProducts(input) {
    let data, error;

    if (InventoryPurchasedCheckbox.checked) {
        ({data, error} = await supabase.rpc('get_customer_products', { input_id: Number(input) }));
    } else {
        ({data, error} = await supabase.rpc('view_all_products'));
    }

    if (error) { console.log(error); }

    CustomerInventoryTable.replaceData(data);
    InventoryFilterInput.value = "";
}

async function getAllCustomerInvoices(input_id) {
    const { data, error } = await supabase.rpc('get_customer_invoices', { customer_input: Number(input_id) });

    if (error) { console.log(error); }

    CustomerInvoicesTable.replaceData(data);
}

async function getAllSalesRepInvoices(input_id) {
    const { data, error } = await supabase.rpc('get_rep_invoices', { rep_input: Number(input_id) });

    if (error) { console.log(error); }

    SalesRepInvoiceTable.replaceData(data);
}

async function validateCustomerId(input_id) {
    const { data, error } = await supabase.rpc('get_all_customer_ids');

    if (error) { console.log(error); }

    if (input_id in data) {
        await getAllProducts(input_id);
        await getAllCustomerInvoices(input_id);
    } else {
        clearTables();
    }
}

async function validateSalesRepId(input_id) {
    const { data, error } = await supabase.rpc('get_all_sales_rep_ids');

    if (error) { console.log(error); }

    if (input_id in data) {
        await getAllSalesRepInvoices(input_id);
    } else {
        clearTables();
    }
}

async function addInvoice() {
    // TODO: Add Invoice, no arguments, only using DOM elements for simplicity
}

function clearTables() {
    CustomerInventoryTable.clearData();
    CustomerInvoicesTable.clearData();
    SalesRepInvoiceTable.clearData();
}

CustomerIDInput.addEventListener("input", debounce((e) => {
    validateCustomerId(CustomerIDInput.value);
}, 1000));

SalesRepIDInput.addEventListener("input", debounce((e) => {
    validateSalesRepId(SalesRepIDInput.value);
}, 1000));

// DETAIL LINE
DetailLineTitle = document.getElementById("detail-line-title");
DetailLineIssuer = document.getElementById("detail-line-issuer");

CustomerInvoicesTable.on("rowClick", function (e, row) {
    showDetailLine(e, row, "customer");
});

SalesRepInvoiceTable.on("rowClick", function (e, row) {
    showDetailLine(e, row, "sales");
});

async function showDetailLine(e, row, role) {
    const { data, error } = await supabase.rpc('get_product_details_by_invoice', { detailline_input: Number(row.getData().invoice_id)});

    if (error) { console.log(error); }

    DetailLineTable.replaceData(data);

    DetailLineTitle.innerText = `Invoice ID: ${row.getData().invoice_id}`;
    if(role === "customer") {
        DetailLineIssuer.innerText = `Issuer: ${row.getData().rep_firstname + " " + row.getData().rep_lastname} (ID: ${row.getData().rep_id})`;
    } else if (role === "sales") {
        DetailLineIssuer.innerText = `Issued to: ${row.getData().customer_firstname + " " + row.getData().customer_lastname} (ID: ${row.getData().customer_id})`;
    }
    detailline.showPopover();
}