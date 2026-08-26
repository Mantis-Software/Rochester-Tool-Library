var PRODUCT_DETAIL_PAGE_HTML = `

<div class="overall-container">
        <a class="product-page-back" href="./inventory.html">Back To Inventory</a>
        <p class="product-page-detail-title">Product Details</p>
        <div class="product-page-container">
            <div class="product-page-image-section">
                <img src="https://placehold.co/400x600" class="product-page-image-section-display-image" id="product_image">
            </div>

            <div class="product-page-details-section">
                <p class="product-page-details-section-detail-title">Description:</p>
                <p class="product-page-details-section-detail-text" id="product_name"></p>
                <br>
                <p class="product-page-details-section-detail-title">Description:</p>
                <p class="product-page-details-section-detail-text" id="product_description"></p>
                <br>
                <p class="product-page-details-section-detail-title">Membership Status:</p>
                <p class="" id="product_membership_status"></p>
                <br>
                <p class="product-page-details-section-detail-title">Availability:</p>
                <p class="product-page-details-section-detail-text" id="product_available"></p>
                <br>
                <p class="product-page-details-section-detail-title">Deposit:</p>
                <p class="product-page-details-section-detail-text" id="product_deposit"></p>
                <p>Deposit will be returned once item is returned and in same condition.</p>
                <br>
                <br>
                <p id="check_out_without_membership"></p>
            </div>

        </div>
    </div>
    <div class="spacer"></div>

    
    <div class="overall-container">
        <div class="product-page-check-out-container">
            <div class="product-page-check-out-details-section">
                <p class="product-page-check-out-details-section-title">Check Out</p>
                <p>Interested in checking out? Contact us directly or simply fill out the form and we will reach out within 1 hour during our operating time.</p>
                <p>Email : tempEmail@gmail.com</p>
                <p>Phone : (832) 570-8833</p>
            </div>

            <div class="product-page-check-out-form-section">
                <label class="product-page-check-out-form-section-label">Full Name</label><br>
                <input type="text" class="product-page-check-out-form-section-input"><br><br><br>
                <label class="product-page-check-out-form-section-label">Membership ID (If Applicable)</label><br>
                <input type="text" class="product-page-check-out-form-section-input"><br><br><br>
                <label class="product-page-check-out-form-section-label">Email</label><br>
                <input type="email" class="product-page-check-out-form-section-input"><br><br><br>
                <label class="product-page-check-out-form-section-label">Desired Checkout Date</label><br>
                <input type="date" class="product-page-check-out-form-section-input"><br>
                <br><br><br><br>
                <a class="product-page-check-out-form-section-check-out-request-button">Send Checkout Request</a>
            </div>
        </div>
    </div>


    <div class="spacer"></div>
    <div class="spacer"></div>
`


var current_page = 1;
var selected_category = 'ALL';

function create_product_item_boxes()
{
    let product_index = 1;
    let start_product_index = (current_page * 10) - 9;
    let start_populating_flag = false
    let tmp_product_name = "";
    let tmp_product_checkout_status = "";
    let tmp_product_image = "";
    let tmp_product_category = "";
    let tmp_product_membership_status = "";
    let tmp_button_css = "";
    let tmp_button_text = "";
    let tmp_button_onclick_function = "";

    let products_html = ``;

    DISPLAYED_PRODUCTS.forEach (function(value, key) {
        if(current_page * 10 < product_index)
        {
            return products_html;
        }

        if(product_index == start_product_index)
        {
            start_populating_flag = true;
        }
        console.log(product_index)
        if(start_populating_flag)
        {
            tmp_product_name = value.get('PRODUCT_NAME');
            tmp_product_checkout_status = value.get('PRODUCT_CHECKOUT_STATUS');
            tmp_product_image = value.get('PRODUCT_IMAGE');
            tmp_product_category = value.get('PRODUCT_CATEGORY');
            tmp_product_membership_status = value.get("PRODUCT_MEMBERSHIP_STATUS");
            
            if (selected_category == 'ALL' || tmp_product_category.toUpperCase() == selected_category.toLocaleUpperCase())
            {
                if(tmp_product_checkout_status)
                {
                    tmp_button_css = "available-button"
                    tmp_button_text = "Checkout"
                    tmp_button_onclick_function = "populate_product_detail_page('"+key+"')"
                }else
                {
                    tmp_button_css = "unavailable-button"
                    tmp_button_text = "Unavailable"
                    tmp_button_onclick_function = null
                }

                products_html += `     
                                    <div class="inventory-grid-item-box">
                                        <img src="${tmp_product_image}" class="inventory-grid-item-box-image">
                                        <p class="inventory-grid-item-box-title">${tmp_product_name}</p>
                                        <p class="inventory-grid-item-box-status-${tmp_product_membership_status.toLowerCase()}">${tmp_product_membership_status.toUpperCase()}</p>
                                        <a class="inventory-grid-item-box-${tmp_button_css}" onclick="${tmp_button_onclick_function}">${tmp_button_text}</a>
                                    </div>   
                                `

            }
        }
        product_index += 1;


    })

    return products_html;
}

function populate_products()
{
    document.getElementById('inventory-grid-container').innerHTML = create_product_item_boxes();
}

function populate_product_detail_page(product_id)
{
    let available_without_membership = ""
    let product_available = "Not Available At This Time"
    if(DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_WITHOUT_MEMBERSHIP"))
    {
        available_without_membership = "*Check out without membership is available."
    }

    if(DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_CHECKOUT_STATUS"))
    {
        product_available = "Available"
    }


    document.getElementById('overall-product-container').innerHTML = PRODUCT_DETAIL_PAGE_HTML;

    

    if(DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_MEMBERSHIP_STATUS").toUpperCase() == "STANDARD")
    {
        document.getElementById("product_membership_status").className = "product-page-details-section-detail-status-standard"
    }else
    {
        document.getElementById("product_membership_status").className = "product-page-details-section-detail-status-premium"
    }

    

    document.getElementById("product_image").innerHTML = DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_IMAGE")
    document.getElementById("product_name").innerHTML = DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_NAME")
    document.getElementById("product_description").innerHTML = DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_DESCRIPTION")
    document.getElementById("product_membership_status").innerHTML = DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_MEMBERSHIP_STATUS").toUpperCase()
    document.getElementById("product_available").innerHTML = product_available
    document.getElementById("product_deposit").innerHTML = DISPLAYED_PRODUCTS.get(product_id).get("PRODUCT_DEPOSIT")
    document.getElementById("check_out_without_membership").innerHTML = available_without_membership
}

function update_products()
{
    DISPLAYED_PRODUCTS = ALL_PROUDCT_MAPS;
    current_page = 1
    var filter_selector = document.getElementById("inventory-filter-categories");
    selected_category = filter_selector.options[filter_selector.selectedIndex].text.toUpperCase();
    
    if(selected_category.toUpperCase() != 'ALL')
    {
        filter_product_map_by_category(selected_category);
    }
    populate_products();
}

function filter_product_map_by_category(category)
{
    let tmpMap = new Map();

    DISPLAYED_PRODUCTS.forEach (function(value, key) {

        if(value.get('PRODUCT_CATEGORY').toUpperCase() == category.toUpperCase())
        {
            tmpMap.set(key, value);
        }

    });

    DISPLAYED_PRODUCTS = tmpMap;
}

function previous_page()
{
    if (current_page > 1)
    {
        current_page -= 1
        populate_products();

    }
}

function next_page()
{

    if(Math.ceil(DISPLAYED_PRODUCTS.size / 10 ) > current_page)
    {
        current_page += 1
        populate_products();
    }
}