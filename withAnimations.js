// Define a class for creating a list of product data - Slider source images
class ProductsFactory {
  setupProductData() {
    this.productData = [
      { name: "Product 1", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/636cf3a212fdca8d40bc63a33a39b481.jpg?imageView2/2/w/800/q/70", price: "$19.99" },
      { name: "Product 2", image: "https://www.bluebananabrand.com/cdn/shop/products/Prod.HoodieClassicBerry1_1296x.jpg?v=1661439815", price: "$24.99" },
      { name: "Product 3", image: "https://www.rocacorbagirona.com/cdn/shop/files/MOCKUPSAW23OK-23_800x.jpg?v=1693470454", price: "$29.99" },
      { name: "Product 4", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/720941e2c42daa4c15f2cd6fa775f346.jpg?imageView2/2/w/800/q/70", price: "$14.99" },
      { name: "Product 5", image: "https://www.rocacorbagirona.com/cdn/shop/files/MOCKUPSAW23OK-21_800x.jpg?v=1693470425", price: "$22.99" },
      { name: "Product 6", image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/059104c1ce4e59b67e1068466d72f3d5.jpg?imageView2/2/w/800/q/70", price: "$34.99" },
    ];

    return this.productData;
  }
}

//POCO Class for product info (image, price..)
class Product {
  constructor(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
  }
}

//vars and styles for setting up the widget container and all internal elements
class RecommendationsWidget {
  constructor(products) {
    this.products = products;
    this.currentPage = 1;

    this.widgetContainer = document.createElement("div");
    this.widgetContainer.className = "recommendations-widget";
    this.setupContainerStyles();

    this.productSlotContainer = document.createElement("div");
    this.productSlotContainer.className = "product-slot-container";
    this.productSlotContainer.style.display = 'flex';

    this.leftArrow = this.createArrowButton("left");
    this.rightArrow = this.createArrowButton("right");

    this.setupArrowButtonListeners();
    this.renderProducts();

    this.widgetContainer.appendChild(this.leftArrow);
    this.widgetContainer.appendChild(this.productSlotContainer);
    this.widgetContainer.appendChild(this.rightArrow);
  }

  setupContainerStyles() {
    this.widgetContainer.style.display = 'flex';
    this.widgetContainer.style.justifyContent = 'center'; // Cambiar de 'space-between' a 'center'
    this.widgetContainer.style.alignItems = 'center';
    this.widgetContainer.style.width = '100%'; // Añadir esta línea para ocupar todo el ancho disponible
  }

  createArrowButton(direction) {
    const arrow = document.createElement("button");
    arrow.innerHTML = direction === "left" ? "&#9665;" : "&#9655;";
    arrow.className = `arrow-button ${direction}-arrow`;
    arrow.style.padding = '10px';
    return arrow;
  }

  addAnimationToWidget() {
    const styleElement = document.createElement('style');
    const animationRule = document.createTextNode(`
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `);

    styleElement.appendChild(animationRule);

    // Append the <style> element to the document's <head>
    document.head.appendChild(styleElement);

    this.widgetContainer.style.animation = 'pulse 1s'; // You can replace 'pulse' with the animation name you desire.
    this.widgetContainer.addEventListener('animationend', () => {
      this.widgetContainer.style.animation = ''; // Reset the animation property
    });
  }

  setupArrowButtonListeners() {
    this.leftArrow.addEventListener("click", () => {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : Math.ceil(this.products.length / 3);
      this.renderProducts();
      this.addScaleAnimation(this.leftArrow);
      this.addAnimationToWidget();
    });

    this.rightArrow.addEventListener("click", () => {
      this.currentPage = this.currentPage < Math.ceil(this.products.length / 3) ? this.currentPage + 1 : 1;
      this.renderProducts();
      this.addScaleAnimation(this.rightArrow);
      this.addAnimationToWidget();
    });
  }

  renderProducts() {
    this.productSlotContainer.innerHTML = "";

    for (let i = (this.currentPage - 1) * 3; i < this.currentPage * 3; i++) {
      const product = this.products[i % this.products.length];
      const productSlot = document.createElement("div");
      productSlot.className = "product-slot";
      this.setupProductSlotStyles(productSlot, product);

      productSlot.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px;" class="product-image">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;

      productSlot.addEventListener("mouseenter", () => {
        productSlot.querySelector(".product-image").style.transform = 'scale(1.1)';
        productSlot.querySelector(".product-image").style.opacity = 0.7;
      });

      productSlot.addEventListener("mouseleave", () => {
        productSlot.querySelector(".product-image").style.transform = 'scale(1)';
        productSlot.querySelector(".product-image").style.opacity = 1;
      });

      this.productSlotContainer.appendChild(productSlot);
    }
  }

  setupProductSlotStyles(productSlot, product) {
    productSlot.style.margin = '10px';
    productSlot.style.padding = '10px';
    productSlot.style.textAlign = 'center';
    productSlot.style.border = '1px solid #ccc';
    productSlot.style.borderRadius = '5px';
  }

  addScaleAnimation(element) {
    element.style.transform = 'scale(1.2)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 300);
  }

  static findProductDetails() {
    const productDetailSections = document.querySelectorAll('.product-details-info');
    for (const section of productDetailSections) {
      if (section.textContent.includes("Oversized Hoodie in Grey")) {
        return section;
      }
    }
    return null;
  }
}




// Trigger point. Create instances of Product and RecommendationsWidget
const productData = new ProductsFactory()
  .setupProductData();

const products = productData.map(product => new Product(product.name, product.image, product.price));

const recommendationsWidget = new RecommendationsWidget(products);

// Find the product details section
const productDetails = RecommendationsWidget.findProductDetails();

//Insert widget into website
if (productDetails) {
  productDetails.parentNode.insertBefore(recommendationsWidget.widgetContainer, productDetails.nextSibling);
}