$(document).ready(function() {
 

     loadOrders();

      

      $("#orderTable").on("keyup", ".order-id,.order-value,.quantity", function() {

            var row =$(this).closest("tr");     
             $(this).closest("tr").find(".order-id-err").text("");
             $(this).closest("tr").find(".order-value-err").text("");
             $(this).closest("tr").find(".quantity-err").text("");
        
      });

         // Add Order
    $("#addOrderBtn").on("click", function () {
           addNewEmptyOrderRow();
    });


      // Add button click event within a row
      $("#orderTable").on("click", ".addActionBtn", function() {
            var row =$(this).closest("tr");
            if(validateData(row) && validateDuplicateOrderId(row) ){

            addNewOrderDataRow(row);
            $('#addOrderBtn').prop('disabled', false);
        }
      });

      // Edit button click event within a row
      $("#orderTable").on("click", ".editActionBtn", function() {
        var row =$(this).closest("tr");
        editOrderDataRow(row);
         $('#addOrderBtn').prop('disabled', true);
          $('.editActionBtn').prop('disabled', true);
           $('.deleteActionBtn').prop('disabled', true);
      });

        $("#orderTable").on("click", ".saveActionBtn", function() {
            var row =$(this).closest("tr");
            if(validateData(row)){
            saveOrderDataRow(row);
             $('#addOrderBtn').prop('disabled', false);
        }
        });

         $("#orderTable").on("click", ".deleteActionBtn", function() {
            var row =$(this).closest("tr");
            var orderId=row.find(".order-id").text();
            var isConfirmed = confirm("Are you sure you want to delete Order ID "+orderId+" ?");
            if(isConfirmed){
             deleteTheOrderDataRow(row);
             alert("orderId with "+ orderId +" is deleted !")
            }

        });
     


  // Add new empty order row
  function addNewEmptyOrderRow() {
        // Add a new row with input fields
        var newRow = $("<tr>");
        newRow.append("<td><input type='text' class='order-id'><br><span style='color: red;'' class='order-id-err'> </span> </td> ");
        newRow.append("<td><input type='text' class='order-value'> <br><span style='color: red;'' class='order-value-err'></td>");
        newRow.append("<td><input type='text' class='quantity'> <br><span style='color: red;'' class='quantity-err'></td>");
        //newRow.append("<td><input type='text' class='amount'></td>");
        newRow.append("<td><button class='addActionBtn btn btn-sm btn-primary'>Add</button></td>");

        // Add the new row to the table
        $("#orderTable tbody").prepend(newRow);
        $('#addOrderBtn').prop('disabled', true);
  }

   // Add new New Order Data Row
  function addNewOrderDataRow(row) {
         
       const newOrder = {
      orderId: row.find(".order-id").val(),
      orderValue: row.closest("tr").find(".order-value").val(),
      quantity: row.closest("tr").find(".quantity").val(),
      //amount: row.closest("tr").find(".amount").val()
    };

    const orders = getOrdersFromLocalStorage();
    orders.unshift(newOrder); // Add to the beginning of the array
    saveOrdersToLocalStorage(orders);
    displayOrders(orders);

  }

   // Edit Order Data Row
  function editOrderDataRow(row) {
              // Get the values from the input fields in the same row
            var orderId = row.find(".order-id").text();
            var orderValue = row.find(".order-value").text();
            var quantity = row.find(".quantity").text();
           // var amount = row.find(".amount").text();
            

         var editRow = $("<tr>");  
        editRow.append("<td><input type='text' class='order-id' value='"+ orderId +"' disabled> <br><span style='color: red;'' class='order-id-err'> </span></td>");
        editRow.append("<td><input type='text' class='order-value' value='"+ orderValue +"'> <br><span style='color: red;'' class='order-value-err'></td>");
        editRow.append("<td><input type='text' class='quantity' value='"+ quantity +"'> <br><span style='color: red;'' class='quantity-err'></td>");
      //  editRow.append("<td><input type='text' class='amount' value='"+ amount +"'></td>");
        editRow.append("<td><button class='saveActionBtn btn btn-sm btn-primary'>Save</button></td>");

            // Add the edit row to the table
            row.replaceWith(editRow);

  }

     // Save Order Data Row
  function saveOrderDataRow(row) {
 /*           var orderId = row.find(".order-id").val();
            var product = row.find(".product").val();
            var quantity = row.find(".quantity").val();
            var amount = row.find(".amount").val();

            // Display data in a new row
            var displayRow = $("<tr>");
            displayRow.append("<td class='order-id'>" + orderId + "</td>");
            displayRow.append("<td class='product'>" + product + "</td>");
            displayRow.append("<td class='quantity'>" + quantity + "</td>");
            displayRow.append("<td class='amount'>" + amount + "</td>");
            displayRow.append("<td><button class='editActionBtn'>Edit</button><button class='deleteBtn'>Delete</button></td>");

            // Save the edited row to the table
            row.replaceWith(displayRow);
 */

    const updatedOrder = {
      orderId: row.find(".order-id").val(),
      orderValue: row.closest("tr").find(".order-value").val(),
      quantity: row.closest("tr").find(".quantity").val(),
      //amount: row.closest("tr").find(".amount").val()
    };



    const orders = getOrdersFromLocalStorage();
    const index = row.index();
    orders[index] = updatedOrder;
    saveOrdersToLocalStorage(orders);
    displayOrders(orders);




  }

  // Save orders to local storage
  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  // Get orders from local storage
  function getOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("orders")) || [];
  }

    // Display orders in the table
  function displayOrders(orders) {
    const tbody = $("#orderTable tbody");
    tbody.empty();

    orders.forEach(order => {  
      // Display data in a new row
            var displayRow = $("<tr>");
            displayRow.append("<td class='order-id'>" + order.orderId + "</td>");
            displayRow.append("<td class='order-value'>" + order.orderValue + "</td>");
            displayRow.append("<td class='quantity'>" + order.quantity + "</td>");
            //displayRow.append("<td class='amount'>" + order.amount + "</td>");
            displayRow.append("<td><button class='editActionBtn btn btn-sm btn-primary'>Edit</button><button class='deleteActionBtn btn btn-sm btn-danger'>Delete</button></td>");

            // Save the edited row to the table
           // row.replaceWith(displayRow);
            tbody.append(displayRow);
    });
  }

    // Load existing data from local storage
  function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    displayOrders(orders);
  }

  function deleteTheOrderDataRow(row) {
     
    const orders = getOrdersFromLocalStorage();
    const index = row.index();
    orders.splice(index, 1);

    saveOrdersToLocalStorage(orders);
    displayOrders(orders);
  }


        // Function to perform empty check validation
            function validateData(row) {
                // Get the value of the textbox
                var orderId =  row.find(".order-id").val();
                var orderValue = row.find(".order-value").val();
                var quantity = row.find(".quantity").val();
                //var amount =row.find(".amount").val();

                // Check if the value is empty
                if (orderId === "") { 
                   // alert("Please enter orderId!"); 
                    row.find(".order-id-err").text("Please enter orderId!");
                    return false;
                }

                
                if (orderValue === "") { 
                    row.find(".order-value-err").text("Please enter Order Value!"); 
                    return false;
                }
                if (quantity === "") { 
                    row.find(".quantity-err").text("Please enter quantity!"); 
                    return false;
                }
              /*  if (amount === "") { 
                    alert("Please enter amount!"); 
                    return false;
                }*/

                // If the value is not empty, allow the form submission
                return true;
            }

             function validateDuplicateOrderId(row) {
                // Get the value of the textbox
                var orderId =  row.find(".order-id").val();
                
                // If the value is not empty, allow the form submission
               
                if(orderId != "") {

                     const orders = getOrdersFromLocalStorage();

                // Filter orders using jQuery
                const filteredOrders = $.grep(orders, function (order) {
                    return order.orderId.toLowerCase().includes(orderId);
                });
                 if(filteredOrders.length > 0)
                 {
                    row.find(".order-id-err").text("Order ID "+orderId+" already exist");
                    return false;
                 }

            }

                  return true;

        }



                 function searchOrders() {
                // Get the value of the search input using jQuery
                const searchTerm = $('#searchOrder').val().toLowerCase();
                const orders = getOrdersFromLocalStorage();

                // Filter orders using jQuery
                const filteredOrders = $.grep(orders, function (order) {
                    return order.orderId.toLowerCase().includes(searchTerm);
                });

                // Render the table using jQuery
                displayOrders(filteredOrders);
            }

            // Attach the search function to the keyup event of the search input
            $('#searchOrder').on('keyup', function () {
                searchOrders();
            });

              // Attach the filterOrders function to the change event of the filter input
            $('#orderValueSlider').on('change', function () {
                const filterValue = $(this).val();
                console.log(filterValue);
                filterOrders(filterValue);
            });

             function filterOrders(value) {
                // Filter orders using jQuery
                const orders = getOrdersFromLocalStorage();
                const filteredOrders = $.grep(orders, function (order) {
                    
                    return parseInt(order.orderValue) > parseInt(value);
                });

                // Render the table using jQuery
                displayOrders(filteredOrders);
            }


            function updateValueDisplay() {
                // Get the current value of the range input
                const currentValue = $('#orderValueSlider').val();

                // Display the current value
                $('#currentValueDisplay').text(currentValue);
            }

            // Attach the updateValueDisplay function to the input event of the range input
            $('#orderValueSlider').on('input', function () {
                updateValueDisplay();
            });

            // Initial update to display the default value
            updateValueDisplay();






 
 
});
