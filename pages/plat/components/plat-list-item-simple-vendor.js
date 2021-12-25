let platSimpleVendor = {
    "name": "vendor_id",
    "type": "container",
    "label": "生产厂商",

    "body": [{
        "type": "link",
        "href": "/#/vendor/${vendor_id}",
        "blank": false,
        "className": "mr-1.5",
        "visibleOn": "this.vendor_id",
        "body": "${vendor_name}",
    }]
}

export default platSimpleVendor;