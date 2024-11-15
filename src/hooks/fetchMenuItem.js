import axios from "axios";

export const fetchMenuItems = async (restaurant) => {
    try {
        const res = await axios.get(
            `http://localhost:3000/api/getmenuitem/${restaurant}`
        );
        const data = res.data.data[0];
        const fetchedMenuItems = {};
        data.dishesByType.forEach((item) => {
            fetchedMenuItems[item.dishType.toLowerCase()] = item.dishes.map(
                (dish) => ({
                    name: dish.dishName,
                    price: `$${dish.price}`,
                    description: dish.description || "A delicious dish to enjoy!",
                    imgSrc: dish.imgSrc || "default_image_url",
                })
            );
        });
        return fetchedMenuItems;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};
