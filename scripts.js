//Create Sample Product DAtabase
const products=[
    {name:"Wireless Mouse",price: 750},
    {name:"Wireless Keyboard",price: 1025},
    {name:"RAM ",price:3500}
];

//The DOM Elements
const productsSelect = document.getElementById("product-select");
const unitPriceInput = document.getElementById("unit-price");
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discount");

//Receipt Display Elements

const receiptProduct = document.getElementById("receipt-product");
const receiptPrice = document.getElementById("receipt-price");
const receiptQuantity = document.getElementById("receipt-quantity");
const receiptSubtotal = document.getElementById("receipt-subtotal");
const receiptDiscount = document.getElementById("receipt-discount");
const receiptTotal = document.getElementById("receipt-total");

//Create a function to Populate Product DropDown
function initProducts(){
    productsSelect.innerHTML="";
    products.forEach((products,index)=>{
        const option = document.createElement("option");
        option.value = index;
        option.textContent=products.name;
        productsSelect.appendChild(option);
    });
}

//Create Calculation HElper Function
function calculateSubtotal(price,quantity){
    return price*quantity;
}
function CalculateDiscount(subtotal,rate){
    return subtotal*(rate/100);
}
function CalculateFinalAmount(subtotal,discount){
return subtotal-discount;
}

//Create function to Format Currency Output
function formatCurrent(amount){
    return "P"+Number(amount).toLocaleString("en-PH",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    })
}
//Create function to Update UI Funtion

function updateReceipt(){
    const selectedIndex = productsSelect.value;
    const selectedProduct = products[selectedIndex];

    const price = selectedProduct ? selectedProduct.price :0;
    const quantity = Math.max(1,parseInt(quantityInput.value)|| 1);
    const discountRate = Math.min(100,Math.max(0,parseFloat(discountInput.value)||0));

    //Block of code To perform Computation
    const subtotal= calculateSubtotal(price,quantity);
    const discount= CalculateDiscount(subtotal,discountRate);
    const finalAmount=CalculateFinalAmount(subtotal,discount);

    //Form Update
    unitPriceInput.value= price.toFixed(2);

    //Receipt Updates
    receiptProduct.textContent=selectedProduct.name;
    receiptPrice.textContent=formatCurrent(price);
    receiptQuantity.textContent=quantity;
    receiptQuantity.textContent= formatCurrent(subtotal);
    receiptDiscount.textContent="-"+formatCurrent(finalAmount);
    //Log calculation to browser console as well
    console.clear();
    console.log("===================");
    console.log("MINI SHOP BILLING");
    console.log("===================");
    console.log(`Products:${selectedProduct.name}`);
    console.log(`Unit Price: ${receiptPrice}`);
    console.log(`Quantity${quantity}`);
    console.log(`Subtotal: ${subtotal}`);
    console.log(`Discount:${discount}`);
    console.log(`Final Amount:${finalAmount}`);
    console.log("====================");
    console.log("=========THANK YOU==========");
    console.log("====================");
}
//Event Listener
productsSelect.addEventListener("change",updateReceipt);
quantityInput.addEventListener("input",updateReceipt);
discountInput.addEventListener("input",updateReceipt);

//Initialize page
initProducts();
updateReceipt();

