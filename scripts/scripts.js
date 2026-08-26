

var current_page = 1;
var selected_category = 'ALL';

function create_product_item_boxes()
{
    let product_index = 1;
    let tmp_product_name = "";
    let tmp_product_checkout_status = "";
    let tmp_product_image = "";
    let tmp_product_category = "";
    let tmp_product_membership_status = "";
    let tmp_button_css = "";
    let tmp_button_text = "";

    let products_html = ``;

    ALL_PROUDCT_MAPS.forEach (function(value, key) {
        if(current_page * 10 < product_index)
        {
            return products_html;
        }

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
            }else
            {
                tmp_button_css = "unavailable-button"
                tmp_button_text = "Unavailable"
            }

            products_html += `     
                                <div class="inventory-grid-item-box">
                                    <img src="${tmp_product_image}" class="inventory-grid-item-box-image">
                                    <p class="inventory-grid-item-box-title">${tmp_product_name}</p>
                                    <p class="inventory-grid-item-box-status-${tmp_product_membership_status.toLowerCase()}">${tmp_product_membership_status.toUpperCase()}</p>
                                    <a class="inventory-grid-item-box-${tmp_button_css}">${tmp_button_text}</a>
                                </div>   
                            `

            product_index += 1;
        }

    })

    return products_html;
}

function populate_products()
{
    document.getElementById('inventory-grid-container').innerHTML = create_product_item_boxes();
}