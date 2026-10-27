
let products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 599,
        rating: 4.5,
        image: "Classic_T-Shirt.png"
    },
    {
        id: 2,
        name: "Smartphone",
        category: "Mobiles",
        price: 14999,
        rating: 4.7,
        image: "Smartphone.png"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.4,
        image: "Wireless_Headphones.png"
    },
    {
        id: 4,
        name: "Lipstick",
        category: "Beauty",
        price: 499,
        rating: 4.3,
        image: "Lipstick.png"
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "Home",
        price: 899,
        rating: 4.2,
        image: "Desk_Lamp.png"
    },
    {
        id: 6,
        name: "Smart TV",
        category: "Appliances",
        price: 24999,
        rating: 4.6,
        image: "Smart_TV.png"
    },
    {
        id: 7,
        name: "Teddy Bear",
        category: "Toys",
        price: 799,
        rating: 4.8,
        image: "Teddy_Bear.png"
    },
    {
        id: 8,
        name: "Healthy Snack Box",
        category: "Food",
        price: 399,
        rating: 4.1,
        image: "Healthy_Snack_Box.png"
    },
    {
        id: 9,
        name: "Car Phone Holder",
        category: "Auto Accessories",
        price: 699,
        rating: 4.2,
        image: "Car_Phone_Holder.png"
    },
    {
        id: 10,
        name: "Football",
        category: "Sports",
        price: 999,
        rating: 4.6,
        image: "Football.png"
    }
];

let cart = [];
let couponApplied = false;

// Select HTML elements
let productList = document.querySelector("#product-list");
let cartItems = document.querySelector("#cart-items");
let searchInput = document.querySelector("#search-input");
let sortFilter = document.querySelector("#sort-filter");
let categoryButtons = document.querySelectorAll(".category");

// Format price
function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// Display star ratings
function showRating(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += "★";
        } else if (i - rating < 1 && i > rating) {
            stars += "★";
        } else {
            stars += "☆";
        }
    }

    return stars;
}

// Display products
function showProducts() {
    productList.innerHTML = "";

    let searchText = searchInput.value.toLowerCase();
    let activeCategory = document.querySelector(
        ".category.active"
    ).getAttribute("data-category");

    let filteredProducts = products.filter(function(product) {
        return (
            product.name.toLowerCase().includes(searchText) &&
            (activeCategory === "All" ||
             product.category === activeCategory)
        );
    });

    // Sorting
    if (sortFilter.value === "low") {
        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    } else if (sortFilter.value === "high") {
        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    } else if (sortFilter.value === "rating") {
        filteredProducts.sort(function(a, b) {
            return b.rating - a.rating;
        });
    }

    if (filteredProducts.length === 0) {
        productList.innerText = "No products found.";
        return;
    }

    filteredProducts.forEach(function(product) {
        let card = document.createElement("div");
        card.className = "product-card";

        let image = document.createElement("img");
        image.className = "product-image";
        image.src = product.image;
        image.alt = product.name;

        let category = document.createElement("p");
        category.className = "product-category";
        category.innerText = product.category;

        let name = document.createElement("h3");
        name.innerText = product.name;

        let rating = document.createElement("div");
        rating.className = "rating";
        rating.innerHTML =
            '<i class="fa-solid fa-star"></i> ' +
            showRating(product.rating) +
            " <span>" + product.rating + "/5</span>";

        let price = document.createElement("p");
        price.className = "product-price";
        price.innerText = formatPrice(product.price);

        let button = document.createElement("button");
        button.className = "add-button";
        button.innerHTML =
            '<i class="fa-solid fa-cart-plus"></i> Add to Cart';

        button.addEventListener("click", function() {
            addToCart(product.id);
        });

        card.appendChild(image);
        card.appendChild(category);
        card.appendChild(name);
        card.appendChild(rating);
        card.appendChild(price);
        card.appendChild(button);

        productList.appendChild(card);
    });
}

// Add product to cart
function addToCart(id) {
    let product = products.find(function(item) {
        return item.id === id;
    });

    let cartProduct = cart.find(function(item) {
        return item.id === id;
    });

    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    showCart();
}

// Display cart and calculate price
function showCart() {
    cartItems.innerHTML = "";

    let subtotal = 0;
    let count = 0;

    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
        count += item.quantity;

        let div = document.createElement("div");
        div.className = "cart-item";

        let image = document.createElement("img");
        image.className = "cart-item-image";
        image.src = item.image;
        image.alt = item.name;

        let info = document.createElement("div");
        info.className = "cart-item-info";

        let name = document.createElement("h4");
        name.innerText = item.name;

        let price = document.createElement("p");
        price.innerText = formatPrice(
            item.price * item.quantity
        );

        let controls = document.createElement("div");
        controls.className = "quantity-controls";

        let minus = document.createElement("button");
        minus.innerText = "−";
        minus.title = "Decrease quantity";

        minus.addEventListener("click", function() {
            changeQuantity(item.id, -1);
        });

        let quantity = document.createElement("span");
        quantity.className = "quantity";
        quantity.innerText = item.quantity;

        let plus = document.createElement("button");
        plus.innerText = "+";
        plus.title = "Increase quantity";

        plus.addEventListener("click", function() {
            changeQuantity(item.id, 1);
        });

        controls.appendChild(minus);
        controls.appendChild(quantity);
        controls.appendChild(plus);

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(controls);

        let remove = document.createElement("button");
        remove.className = "remove-button";
        remove.innerHTML = '<i class="fa-solid fa-trash"></i>';

        remove.addEventListener("click", function() {
            removeFromCart(item.id);
        });

        div.appendChild(image);
        div.appendChild(info);
        div.appendChild(remove);

        cartItems.appendChild(div);
    });

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    let discount = 0;

    if (couponApplied) {
        discount = Math.round(subtotal * 10 / 100);
    }

    let delivery = 0;

    if (subtotal > 0 && subtotal < 2000) {
        delivery = 99;
    }

    let total = subtotal - discount + delivery;

    document.querySelector("#cart-count").innerText = count;
    document.querySelector("#subtotal").innerText =
        formatPrice(subtotal);
    document.querySelector("#discount").innerText =
        formatPrice(discount);
    document.querySelector("#delivery").innerText =
        delivery === 0 ? "FREE" : formatPrice(delivery);
    document.querySelector("#total").innerText =
        formatPrice(total);

    document.querySelector("#checkout-button").disabled =
        cart.length === 0;

    // Reset coupon when cart becomes empty
    if (cart.length === 0) {
        couponApplied = false;
    }
}

let moreButton = document.querySelector("#more-btn");
let dropdownMenu = document.querySelector("#dropdown-menu");
let moreArrow = document.querySelector("#more-arrow");

moreButton.addEventListener("click", function() {
    dropdownMenu.classList.toggle("show");

    if (dropdownMenu.classList.contains("show")) {
        moreArrow.className = "fa-solid fa-angle-down";
    } else {
        moreArrow.className = "fa-solid fa-angle-up";
    }
});

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".more-menu")) {
        dropdownMenu.classList.remove("show");
        moreArrow.className = "fa-solid fa-angle-up";
    }
});

// Update the navigation cart count
function updateNavbarCart() {
    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });

    document.querySelector("#navbar-cart-count").innerText = count;
}

// Login button
document.querySelector("#login-btn").addEventListener("click", function() {
    alert("Welcome to UCart! Login functionality can be added here.");
});

// Seller link
document.querySelector("#seller-link").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Welcome to UCart Seller Centre!");
});

// Update both cart counts whenever the cart changes
let originalShowCart = showCart;

showCart = function() {
    originalShowCart();
    updateNavbarCart();
};

updateNavbarCart();

// Increase or decrease quantity
function changeQuantity(id, amount) {
    cart.forEach(function(item) {
        if (item.id === id) {
            item.quantity += amount;
        }
    });

    cart = cart.filter(function(item) {
        return item.quantity > 0;
    });

    showCart();
}

// Remove product from cart
function removeFromCart(id) {
    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    showCart();
}

// Search products
searchInput.addEventListener("input", function() {
    showProducts();
});

// Sort products
sortFilter.addEventListener("change", function() {
    showProducts();
});

// Filter by category
categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        categoryButtons.forEach(function(category) {
            category.classList.remove("active");
        });

        button.classList.add("active");
        showProducts();
    });
});

// Coupon popup
document.querySelector("#apply-coupon").addEventListener(
    "click", function() {
        let code = document.querySelector("#coupon-input")
            .value.trim().toUpperCase();

        if (code === "SAVE10" && cart.length > 0) {
            if (couponApplied) {
                alert("Congratulations! The SAVE10 coupon is already applied.");
            } else {
                couponApplied = true;
                showCart();
                alert("🎉 Congratulations! Your SAVE10 coupon has been applied successfully. You saved 10%!");
            }
        } else if (code === "SAVE10") {
            alert("Please add products to your cart before applying the coupon.");
        } else {
            alert("Invalid coupon code! Please enter SAVE10.");
        }
    }
);

// Checkout
document.querySelector("#checkout-button").addEventListener(
    "click", function() {
        if (cart.length > 0) {
            let total = document.querySelector("#total").innerText;

            alert("🎉 Thank you for shopping at UCart!\nYour total is " + total);

            cart = [];
            couponApplied = false;

            document.querySelector("#coupon-input").value = "";

            showCart();
        }
    }
);

// Initial display
showProducts();
showCart();
