import React, { useEffect, useState } from "react";
import { database } from "../config.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const RecipeJournal = () => {
  const [formInput, setFormInput] = useState({
    title: "",
    creator: "",
    category: "",
    description: "",
    link: "",
    createdAt: "",
  });

  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const recipesCollection = collection(database, "ResepMakanan");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(recipesCollection);
    setRecipes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoc(doc(database, "ResepMakanan", currentEditId), {
        ...formInput,
        createdAt: formInput.createdAt || new Date().toISOString().split('T')[0]
      });
      setIsEditing(false);
      setCurrentEditId(null);
    } else {
      await addDoc(recipesCollection, {
        ...formInput,
        createdAt: formInput.createdAt || new Date().toISOString().split('T')[0]
      });
    }

    setFormInput({
      title: "",
      creator: "",
      category: "",
      description: "",
      link: "",
      createdAt: "",
    });
    setShowForm(false);
    getData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(database, "ResepMakanan", id));
    getData();
  };

  const handleEdit = (recipe) => {
    setFormInput({
      title: recipe.title,
      creator: recipe.creator,
      category: recipe.category,
      description: recipe.description,
      link: recipe.link,
      createdAt: recipe.createdAt,
    });
    setIsEditing(true);
    setCurrentEditId(recipe.id);
    setShowForm(true);
  };

  const categoryBadgeClass = {
    "Appetizer": "bg-success",
    "Main Course": "bg-primary",
    "Dessert": "bg-info",
    "Beverage": "bg-warning",
    "default": "bg-secondary"
  };

  const getCategoryBadge = (category) => {
    return categoryBadgeClass[category] || categoryBadgeClass.default;
  };

  return (
    <div className="container-fluid px-4" style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="h3">Recipe Collection</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-sm"
        >
          {showForm ? "Close Form" : "Add New Recipe"}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h5 mb-3">{isEditing ? "Edit Recipe" : "Add New Recipe"}</h2>
            <form onSubmit={handleCreate}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small">Recipe Title</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formInput.title}
                    placeholder="Enter recipe title"
                    onChange={(e) => setFormInput(prev => ({ ...prev, title: e.target.value }))}
                    maxLength={100}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Creator Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formInput.creator}
                    placeholder="Enter creator name"
                    onChange={(e) => setFormInput(prev => ({ ...prev, creator: e.target.value }))}
                    maxLength={50}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Category</label>
                  <select
                    className="form-select form-select-sm"
                    value={formInput.category}
                    onChange={(e) => setFormInput(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Creation Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={formInput.createdAt}
                    onChange={(e) => setFormInput(prev => ({ ...prev, createdAt: e.target.value }))}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small">Recipe Link</label>
                  <input
                    type="url"
                    className="form-control form-control-sm"
                    value={formInput.link}
                    placeholder="Enter recipe link"
                    onChange={(e) => setFormInput(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small">Description</label>
                  <textarea
                    className="form-control form-control-sm"
                    value={formInput.description}
                    placeholder="Enter recipe description"
                    rows="3"
                    onChange={(e) => setFormInput(prev => ({ ...prev, description: e.target.value }))}
                    maxLength={500}
                  ></textarea>
                </div>
              </div>
              <div className="text-end mt-3">
                <button type="submit" className="btn btn-primary btn-sm">
                  {isEditing ? "Update Recipe" : "Save Recipe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row g-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="w-100">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className={`badge ${getCategoryBadge(recipe.category)}`}>
                        {recipe.category}
                      </span>
                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </small>
                    </div>

                    <h3 className="h5 mb-2 text-truncate" style={{ maxWidth: '90%' }}>
                      {recipe.title}
                    </h3>

                    <p className="text-muted small mb-2 text-truncate">
                      By: {recipe.creator}
                    </p>
                    <p className="card-text small text-muted mb-3"
                       style={{
                         overflow: 'hidden',
                         display: '-webkit-box',
                         WebkitLineClamp: '2',
                         WebkitBoxOrient: 'vertical',
                         textOverflow: 'ellipsis',
                         lineHeight: '1.4em',
                         maxHeight: '2.8em'
                       }}>
                      {recipe.description}
                    </p>

                    <div className="d-flex gap-2">
                      <a
                        href={recipe.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        View Recipe
                      </a>

                      <button
                        onClick={() => handleEdit(recipe)}
                        className="btn btn-outline-warning btn-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(recipe.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeJournal;

                    
