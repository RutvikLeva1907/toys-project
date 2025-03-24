document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");

    let productsData = [];

    // Fetch Products from db.json
    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(products => {
            productsData = products;
            displayProducts(productsData);
        })
        .catch(error => console.error("Error fetching products:", error));

    // Display Products Function
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-md">
                <h2 class="text-lg font-semibold mt-2">${product.name}</h2>
                <p class="text-gray-500">₹${product.price}</p>
                <p class="text-sm text-gray-400">${product.category}</p>
            `;

            productList.appendChild(productCard);
        });
    }

    // Search Functionality
    searchInput.addEventListener("input", () => {
        let searchQuery = searchInput.value.toLowerCase();
        let filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchQuery)
        );
        displayProducts(filteredProducts);
    });

    // Filter by Category
    filterCategory.addEventListener("change", () => {
        let selectedCategory = filterCategory.value;
        let filteredProducts = selectedCategory
            ? productsData.filter(product => product.category === selectedCategory)
            : productsData;

        displayProducts(filteredProducts);
    });
});
