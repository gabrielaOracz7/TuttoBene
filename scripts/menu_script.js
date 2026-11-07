// store all menu items
const menu = [];

class MenuItem {
  constructor(name, category, price, ingredients, file_name, is_vegetarian) {
    this.name = name.trim();
    this.category = category.trim().toLowerCase();
    this.price = Number(price.trim());
    this.ingredients = ingredients.trim();
    this.file_name = file_name.trim();
    this.is_vegetarian = is_vegetarian.trim().toLowerCase() === "true";
  }
}

// fetch menu data from the csv file and display it
fetch("data/menu.csv")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Nie udało się pobrać pliku menu.csv");
    }
    return response.text();
  })
  .then((data) => {
    const rows = data.trim().split(/\r?\n/);

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(";");

      const [name, category, price, ingredients, file_name, is_vegetarian] =
        cols;

      const menuItem = new MenuItem(
        name,
        category,
        price,
        ingredients,
        file_name,
        is_vegetarian,
      );
      menu.push(menuItem);
    }
    displayMenu(menu);
  })
  .catch((error) => {
    console.log("Błąd: ", error);
  });

// create a DOM element for a single menu item
function createMenuItem(item) {
  const container = document.createElement("div");
  container.classList.add("menu-item");

  const image = document.createElement("img");
  image.src = `images/menu/${item.category}/${item.file_name}`;
  image.alt = item.name;

  const title = document.createElement("h2");
  title.textContent = item.name;

  const ingredients = document.createElement("p");
  ingredients.classList.add("item-ingredients");
  ingredients.textContent = item.ingredients.replaceAll(",", ", ").trim();

  const price = document.createElement("p");
  price.classList.add("item-price");
  price.textContent = `${item.price.toFixed(2).replace(".", ",")} zł`;

  container.append(image, title, ingredients, price);
  return container;
}

// display menu items in their categories
function displayMenu(menu) {
  clearMenu();
  menu.forEach((item) => {
    const categoryName = item.category;

    const categoryContainer = document.getElementById(categoryName);

    const categoryItems = categoryContainer?.querySelector(".category-items");
    if (!categoryItems) {
      console.warn(`Nie znaleziono kontenera ${categoryName}`);
      return;
    }

    const menuItemElement = createMenuItem(item);
    categoryItems.appendChild(menuItemElement);
    menuItemElement.addEventListener("click", () => {
      menuItemElement.classList.toggle("show-ingredients");
    });
    categoryContainer.classList.remove("hidden");
  });
}

// event listeners for the menu filter buttons
const filterButtons = document.querySelectorAll(".filter-options .btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => filterItems(btn.id));
});

// filter menu items by category
function filterItems(id) {
  const filtersMap = {
    all: "all",
    starters_only: "starters",
    pizza_only: "pizza",
    pasta_only: "pasta",
    desserts_only: "desserts",
    drinks_only: "drinks",
    vege_only: "is_vegetarian",
  };

  const option = filtersMap[id.toLowerCase()];

  if (option === "all") {
    displayMenu(menu);
  } else if (option === "is_vegetarian") {
    displayMenu(menu.filter((item) => item.is_vegetarian === true));
  } else {
    displayMenu(menu.filter((item) => item.category === option));
  }
}

// remove all menu items and hide categories
function clearMenu() {
  const categoryWrappers = document.querySelectorAll(".category-wrapper");

  categoryWrappers.forEach((wrapper) => {
    const categoryItems = wrapper.querySelector(".category-items");
    categoryItems.replaceChildren();
    wrapper.classList.add("hidden");
  });
}
