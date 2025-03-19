import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  instructions: string;
  imageURL: string | null;
  rating: number;
  category_id: string;
  user_id: string;
  created_at?: string;
}

export default function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    if (!user?.id) {
      navigate('/login');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (err) {
      alert('Could not load recipes');
      setRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [user?.id]);

  const handleDelete = async (recipeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);

      if (error) throw error;
      setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    } catch (err) {
      alert('Could not delete recipe');
    }
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <div className="recipe-card">
      <button
        onClick={() => handleDelete(recipe.id)}
        title="Delete recipe"
        className="delete-button"
      >
        ×
      </button>
      <img
        src={recipe.imageURL || "/no-picture.png"}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span>Servings: {recipe.servings}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-recipes-container">
      <h2 className="my-recipes-title">My Recipes:</h2>
      {recipes.length === 0 ? (
        <div className="empty-recipes">
          <p>No recipes found.</p>
          <Link to="/add-recipe" className="add-first-recipe">Add First Recipe</Link>
        </div>
      ) : (
        <div className="recipes-grid-container">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}