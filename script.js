document.addEventListener("DOMContentLoaded", function () {
    addSmoothScrollingToLinks();
    fetchSpecialsUrls();
    addTabListeners();
    loadMenu();
});

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
        });
    }
}

function addSmoothScrollingToLinks() {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => {
        link.addEventListener("click", smoothScroll);
    });
}

function fetchSpecialsUrls() {
    fetch("./assets/specials.json")
        .then((response) => response.json())
        .then((specials) => {
            console.log(specials);
            const akcijaPiceContainer = document.getElementById("akcija-pice");
            specials.akcijaPice.forEach((src) => {
                const img = document.createElement("img");
                img.src = src;
                akcijaPiceContainer.appendChild(img);
            });
            const akcijaPomfritContainer =
                document.getElementById("akcija-pomfrit");
            specials.akcijaPomfrit.forEach((src) => {
                const img = document.createElement("img");
                img.src = src;
                akcijaPomfritContainer.appendChild(img);
            });
            const akcijaPicePomfritContainer = document.getElementById(
                "akcija-pice-pomfrit"
            );
            specials.akcijaPicePomfrit.forEach((src) => {
                const img = document.createElement("img");
                img.src = src;
                akcijaPicePomfritContainer.appendChild(img);
            });
        });
}

function updateContentDisplay(contentDivs) {
    // Hide all content divs
    contentDivs.forEach((div) => (div.style.display = "none"));

    // Show the selected content div
    const selectedRadio = document.querySelector(
        "input[name='akcija']:checked"
    );
    console.log("selected radio", selectedRadio);

    const selectedContentId = selectedRadio.value;
    const activeContent = document.getElementById(selectedContentId);

    if (activeContent) {
        activeContent.style.display = "grid";
    }
}

function addTabListeners() {
    const contentDivs = document.querySelectorAll(".akcija-content");
    const radioButtons = document.querySelectorAll("input[name='akcija']");

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () =>
            updateContentDisplay(contentDivs)
        );
    });

    updateContentDisplay(contentDivs);
}

function loadMenu() {
    fetch("./assets/menu.json")
        .then((response) => response.json())
        .then((menu) => {
            console.log(menu);
            const menuContainer = document.getElementById("menu");
            const categories = Object.keys(menu);

            categories.forEach((category) => {
                const categoryDiv = document.createElement("div");
                categoryDiv.className = "category";
                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category.toUpperCase();
                categoryDiv.appendChild(categoryTitle);

                const items = menu[category];
                items.forEach((item) => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "item";

                    if (item.image) {
                        const itemImage = document.createElement("img");
                        itemImage.src = item.image;
                        itemImage.alt = item.name;
                        itemDiv.appendChild(itemImage);
                    }

                    const itemInfo = document.createElement("div");
                    itemInfo.className = "item-info";
                    itemDiv.appendChild(itemInfo);

                    const itemTitle = document.createElement("h3");
                    itemTitle.textContent = item.name;
                    itemInfo.appendChild(itemTitle);

                    const itemSize = document.createElement("span");
                    itemSize.textContent = item.size;
                    itemTitle.appendChild(itemSize);

                    if (item.description) {
                        const itemDescription = document.createElement("p");
                        itemDescription.textContent = item.description;
                        itemInfo.appendChild(itemDescription);
                    }

                    const itemPrice = document.createElement("p");
                    itemPrice.textContent = item.price + " RSD";
                    itemPrice.className = "price";
                    itemDiv.appendChild(itemPrice);

                    categoryDiv.appendChild(itemDiv);
                });

                menuContainer.appendChild(categoryDiv);
            });
        });
}

// menu for reference
// {
//     "rostilj": [
//         {
//             "name": "Mala pljeskavica",
//             "size": "100g",
//             "price": 290,
//             "image": "assets/slike-hrane/Mala Pljeskavica.jpg"
//         },
//         {
//             "name": "Srednja pljeskavica",
//             "size": "150g",
//             "price": 340,
//             "image": "assets/slike-hrane/Srednja Pljeskavica.jpg"
//         },
//         {
//             "name": "Velika pljeskavica",
//             "size": "200g",
//             "price": 390,
//             "image": "assets/slike-hrane/Velika Pljeskavica.jpg"
//         },
//         {
//             "name": "Punjena pljeskavica",
//             "size": "250g",
//             "description": "200g mesa, 30g kačkavalja, 20g šunke",
//             "price": 460,
//             "image": "assets/slike-hrane/Punjena Pljeskavica.jpg"
//         },
//         {
//             "name": "Gurmanska pljeskavica",
//             "size": "250g",
//             "description": "200g mesa, 10g luka/tucana, 40g kačkavalj",
//             "price": 460,
//             "image": "assets/slike-hrane/Gurmanska Pljeskavica.jpg"
//         },
//         {
//             "name": "Gurmanska čarolija",
//             "size": "300g",
//             "description": "200g mesa, 40g jaje, 30g suvi vrat , 40g kačkavalj",
//             "price": 500,
//             "image": "assets/slike-hrane/Gurmanska Carolija.jpg"
//         },
//         {
//             "name": "Ćevapi",
//             "size": "150g",
//             "price": 340,
//             "image": "assets/slike-hrane/Ćevapi.jpg"
//         },
//         {
//             "name": "Uštipci",
//             "size": "250g",
//             "description": "200g mesa, 5g peršun, 5g beli luk , 40g kačkavalj",
//             "price": 460,
//             "image": "assets/slike-hrane/Uštipci.jpg"
//         },
//         {
//             "name": "Kobasica",
//             "size": "150g",
//             "price": 350,
//             "image": "assets/slike-hrane/Kobasica.jpg"
//         },
//         {
//             "name": "Batak",
//             "size": "200g",
//             "price": 390,
//             "image": "assets/slike-hrane/Batak.jpg"
//         },
//         {
//             "name": "Pileće belo",
//             "size": "200g",
//             "price": 400,
//             "image": "assets/slike-hrane/Pileće Belo.jpg"
//         },
//         {
//             "name": "Bela vešalica",
//             "size": "200g",
//             "price": 500,
//             "image": "assets/slike-hrane/Bela Vešalica.jpg"
//         },
//         {
//             "name": "Svinjski vrat",
//             "size": "200g",
//             "price": 500,
//             "image": "assets/slike-hrane/Svinjski Vrat.jpg"
//         },
//         {
//             "name": "Hot dog",
//             "size": "100g",
//             "price": 250,
//             "image": "assets/slike-hrane/Hot Dog.jpg"
//         },
//         {
//             "name": "Mešano meso",
//             "size": "1kg",
//             "description": "200g batak, 200g pileće belo, 200g roštiljske kobasice, 200g uštipci, 200g ćevapi",
//             "price": 1800,
//             "image": "assets/slike-hrane/Mešano Meso.jpg"
//         }
//     ],
//     "prilozi": [
//         {
//             "name": "Pomfrit",
//             "size": "200g",
//             "price": 200
//         },
//         {
//             "name": "Lepinja / Somun",
//             "size": "",
//             "price": 60
//         }
//     ],
//     "pice": [
//         {
//             "name": "Coca Cola",
//             "size": "0.33l",
//             "price": 120
//         },
//         {
//             "name": "Schweppes",
//             "size": "0.33l",
//             "price": 120
//         },
//         {
//             "name": "Fanta",
//             "size": "0.33l",
//             "price": 120
//         },
//         {
//             "name": "Rosa gazirana",
//             "size": "0.5l",
//             "price": 80
//         }
//     ]
// }
