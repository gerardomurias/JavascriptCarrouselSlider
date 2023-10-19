// Define the product recommendations data (you can replace this with actual product data)
const products = [
  { name: "Product 1", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/636cf3a212fdca8d40bc63a33a39b481.jpg?imageView2/2/w/800/q/70", price: "$19.99" },
  { name: "Product 2", image: "https://www.bluebananabrand.com/cdn/shop/products/Prod.HoodieClassicBerry1_1296x.jpg?v=1661439815", price: "$24.99" },
  { name: "Product 3", image: "https://www.rocacorbagirona.com/cdn/shop/files/MOCKUPSAW23OK-23_800x.jpg?v=1693470454", price: "$29.99" },
  { name: "Product 4", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/720941e2c42daa4c15f2cd6fa775f346.jpg?imageView2/2/w/800/q/70", price: "$14.99" },
  { name: "Product 5", image: "https://www.rocacorbagirona.com/cdn/shop/files/MOCKUPSAW23OK-21_800x.jpg?v=1693470425", price: "$22.99" },
  { name: "Product 6", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/059104c1ce4e59b67e1068466d72f3d5.jpg?imageView2/2/w/800/q/70", price: "$34.99" },
];

// Function to find the product details section based on its class
function findProductDetails() {
  const productDetailSections = document.querySelectorAll('.product-details-info');
  for (const section of productDetailSections) {
    if (section.textContent.includes("Oversized Hoodie in Grey")) {
      return section;
    }
  }
  return null;
}

// Create the recommendations widget
function createRecommendationsWidget() {
  const widgetContainer = document.createElement("div");
  widgetContainer.className = "recommendations-widget";

  // Add CSS styles to the widget container
  widgetContainer.style.display = 'flex';
  widgetContainer.style.justifyContent = 'space-between';
  widgetContainer.style.alignItems = 'center';

  // Create left and right arrow buttons for scrolling
  const leftArrow = document.createElement("button");
  leftArrow.innerHTML = "&#9665;";
  leftArrow.className = "arrow-button left-arrow";
  leftArrow.style.padding = '10px';

  const rightArrow = document.createElement("button");
  rightArrow.innerHTML = "&#9655;";
  rightArrow.className = "arrow-button right-arrow";
  rightArrow.style.padding = '10px';

  // Create a product slot container
  const productSlotContainer = document.createElement("div");
  productSlotContainer.className = "product-slot-container";
  productSlotContainer.style.display = 'flex';

  // Initialize the current page
  let currentPage = 1;

  // Function to render the products in the widget with transition effect
  function renderProducts() {
    productSlotContainer.innerHTML = "";

    for (let i = (currentPage - 1) * 3; i < currentPage * 3; i++) {
      const product = products[i % products.length];
      const productSlot = document.createElement("div");
      productSlot.className = "product-slot";

      productSlot.style.margin = '10px';
      productSlot.style.padding = '10px';
      productSlot.style.textAlign = 'center';
      productSlot.style.border = '1px solid #ccc';
      productSlot.style.borderRadius = '5px';

      productSlot.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px;" class="product-image">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;

      // Apply the transition effect on hover
      productSlot.addEventListener("mouseenter", () => {
        productSlot.querySelector(".product-image").style.transform = 'scale(1.1)';
        productSlot.querySelector(".product-image").style.opacity = 0.7;
      });

      // Reset the transition effect when mouse leaves
      productSlot.addEventListener("mouseleave", () => {
        productSlot.querySelector(".product-image").style.transform = 'scale(1)';
        productSlot.querySelector(".product-image").style.opacity = 1;
      });

      productSlotContainer.appendChild(productSlot);
    }
  }

  // Add event listeners for arrow buttons
  leftArrow.addEventListener("click", () => {
    currentPage = currentPage > 1 ? currentPage - 1 : Math.ceil(products.length / 3);
    renderProducts();
     // Add animation effect to the left arrow
     leftArrow.style.transform = 'scale(1.2)';
     setTimeout(() => {
       leftArrow.style.transform = 'scale(1)';
     }, 300); // Reset the scale after 0.3s
  });

  rightArrow.addEventListener("click", () => {
    currentPage = currentPage < Math.ceil(products.length / 3) ? currentPage + 1 : 1;
    renderProducts();
    // Add animation effect to the right arrow
    rightArrow.style.transform = 'scale(1.2)';
    setTimeout(() => {
      rightArrow.style.transform = 'scale(1)';
    }, 300); // Reset the scale after 0.3s
  });

  // Initial render
  renderProducts();

  // Append elements to the widget container
  widgetContainer.appendChild(leftArrow);
  widgetContainer.appendChild(productSlotContainer);
  widgetContainer.appendChild(rightArrow);

  return widgetContainer;
}

// Find the product details section
const productDetails = findProductDetails();

if (productDetails) {
  const recommendationsWidget = createRecommendationsWidget();
  productDetails.parentNode.insertBefore(recommendationsWidget, productDetails.nextSibling);
}