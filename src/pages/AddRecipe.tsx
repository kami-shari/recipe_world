import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function AddRecipePage() {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    instructions: "",
    servings: 1,
    imageURL: ""
  });
  
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Funktion für Eingabeänderungen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prüfen ob Felder ausgefüllt sind
    if (!recipe.title || !recipe.description || !recipe.instructions) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Rezept in Datenbank speichern
      const result = await supabase
        .from("recipes")
        .insert({
          ...recipe,
          rating: 0,
          category_id: "d67b8d6c-bcc3-4900-be50-1b803e95f5d4",
          user_id: user.id,
          imageURL: recipe.imageURL || "/no-picture.png"
        })
        .select("id")
        .single();

      if (result.error) {
        alert("Could not save recipe");
        return;
      }

      // Formular zurücksetzen und zur Übersicht navigieren
      setRecipe({
        title: "",
        description: "",
        instructions: "",
        servings: 1,
        imageURL: ""
      });
      
      navigate("/my-recipes");
    } catch (error) {
      alert("Something went wrong");
    }
  };
  
  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h1>Add New Recipe</h1>
        
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={recipe.title} 
            onChange={handleChange}
            required
            placeholder="Title"
          />
        </div>

        <div className="form-group">
          <textarea
            name="description"
            value={recipe.description} 
            onChange={handleChange}
            placeholder="Description"
            required
            rows={3}
          />
        </div>

        <div className="form-group">
          <textarea
            name="instructions"
            value={recipe.instructions} 
            onChange={handleChange}
            placeholder="Instructions"
            required
            rows={5}
          />
        </div>

        <div className="form-group">
          <label>Servings:</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings} 
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="imageURL"
            value={recipe.imageURL} 
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>

        <button type="submit" className="submit-button">Add Recipe</button>
      </form>
    </div>
  );
}

