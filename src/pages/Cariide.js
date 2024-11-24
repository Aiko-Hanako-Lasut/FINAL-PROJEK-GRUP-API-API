import React, { Component } from "react";
import { database } from "../config.js";
import { collection, getDocs } from "firebase/firestore";

class Ideresep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchQuery: "",
      selectedCategory: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  // Fetch data from Firebase Firestore
  getData = async () => {
    const recipesCollection = collection(database, "ResepMakanan");
    const querySnapshot = await getDocs(recipesCollection);
    const recipes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    this.setState({ recipes });
  };

  // Handle search input change
  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  // Handle category selection change
  handleCategoryChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  render() {
    const { recipes, searchQuery, selectedCategory } = this.state;

    // Filter recipes based on search query and selected category
    const filteredRecipes = recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="container py-4">
        <h1 className="mb-4 text-center">IDE RESEP MAKANAN</h1>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={this.handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
        </div>

        <div className="row g-3">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="text-muted">Category: {recipe.category}</p>
                  <p
                    className="card-text text-truncate"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {recipe.description}
                  </p>
                  <a
                    href={recipe.link}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <p className="text-center text-muted mt-4">
            No recipes found. Try adjusting your search or category filter.
          </p>
        )}
      </div>
    );
  }
}

export default Ideresep;
