import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  time: string;
  difficulty: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Italian Tiramisu",
    image: "/food-pictures/tiramisu.jpeg",
    description: "A luxurious Italian dessert made with layers of coffee-soaked ladyfingers and creamy mascarpone filling.",
    time: "45 mins",
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Homemade Sourdough Bread",
    image: "/food-pictures/sourdough-bread.jpeg",
    description: "Crusty artisan bread with a perfect chewy texture and tangy flavor. Made with love and patience.",
    time: "24 hrs",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Thai Green Curry",
    image: "/food-pictures/thai-curry.jpeg",
    description: "Aromatic and creamy curry with fresh vegetables and your choice of protein. A taste of Thailand at home.",
    time: "35 mins",
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "Perfect French Macarons",
    image: "/food-pictures/macarons.jpeg",
    description: "Delicate almond meringue cookies with a smooth ganache filling. The ultimate French pastry challenge.",
    time: "2 hrs",
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "Japanese Ramen",
    image: "/food-pictures/ramen.jpeg",
    description: "Rich and comforting bowl of noodles in a flavorful broth, topped with classic Japanese ingredients.",
    time: "3 hrs",
    difficulty: "Medium"
  },
  {
    id: 6,
    title: "Mediterranean Quinoa Bowl",
    image: "/food-pictures/salad.jpeg",
    description: "Healthy and colorful bowl packed with protein-rich quinoa, fresh vegetables, and Mediterranean flavors.",
    time: "25 mins",
    difficulty: "Easy"
  },
  {
    id: 7,
    title: "Chocolate Lava Cake",
    image: "/food-pictures/cake.jpeg",
    description: "Decadent individual chocolate cakes with a warm, flowing chocolate center. Pure chocolate heaven.",
    time: "30 mins",
    difficulty: "Medium"
  },
  {
    id: 8,
    title: "Vietnamese Pho",
    image: "/food-pictures/pho.jpeg",
    description: "Traditional Vietnamese noodle soup with aromatic broth, tender meat, and fresh herbs.",
    time: "4 hrs",
    difficulty: "Medium"
  },
  {
    id: 9,
    title: "Spanish Paella",
    image: "/food-pictures/paella.jpeg",
    description: "Traditional Spanish rice dish with saffron, seafood, and vegetables. A flavor explosion from Valencia.",
    time: "1 hr",
    difficulty: "Medium"
  }
];

export function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Recipe World</h1>
        <p className="hero-description">
          Discover amazing recipes from around the world and create delicious meals at home
        </p>
        <Link to="/add-recipe" className="share-recipe-button">
          Share Your Recipe
        </Link>
      </div>

      <h2 className="featured-title">Featured Recipes</h2>

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-item">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-content">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span>⏱️ {recipe.time}</span>
                <span className={`difficulty-badge difficulty-${recipe.difficulty.toLowerCase()}`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to start cooking?</h2>
        <p className="cta-description">
          Join our community and share your favorite recipes with food lovers around the world.
        </p>
        <Link to="/register" className="create-account-button">
          Create Account
        </Link>
      </div>
    </div>
  );
}
