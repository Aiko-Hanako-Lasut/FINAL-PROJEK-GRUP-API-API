import React, { useState, useEffect } from "react";
import { database } from "../config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Profile = () => {
  // State untuk menyimpan data profil
  const [profile, setProfile] = useState(null); // Null saat data belum di-load
  const [formData, setFormData] = useState(null); // Null untuk sementara
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Daftar kategori favorite food
  const foodCategories = [
    "Manisan",
    "Kue",
    "Makanan Pedas",
    "Makanan Asin",
    "Makanan Laut",
  ];

  // Handle perubahan data pada form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "favoriteFood" ? Array.from(e.target.selectedOptions, (opt) => opt.value) : value,
    }));
  };

  // Simpan perubahan data ke Firestore
  const handleSave = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await setDoc(doc(database, "profiles", formData.email), formData);
      setProfile({ ...formData });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please try again later.");
    }
  };

  // Ambil data dari Firestore saat komponen dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = "user@example.com"; // Email default atau dari auth
        const docRef = doc(database, "profiles", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setFormData(data);
        } else {
          console.warn("Profile not found. Loading default data.");
          const defaultProfile = {
            name: "USERNAME",
            email: email,
            favoriteFood: [],
          };
          setProfile(defaultProfile);
          setFormData(defaultProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#E38E49",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src="/kitchenwhisper.jpg"
          alt="Profile Avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
        <h2 style={{ margin: "10px 0" }}>{profile.name}</h2>
        <p style={{ margin: 0, fontStyle: "italic" }}>COOKERS YANG SUKA SHARING ^^</p>
        <button
          type="button"
          className="btn btn-light mt-3"
          data-bs-toggle="modal"
          data-bs-target="#editProfileModal"
          style={{
            background: "white",
            color: "#6b5b95",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Informasi Profil */}
      <div
        style={{
          padding: "20px",
          background: "#f9f9f9",
        }}
      >
        <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
          Profile Information
        </h4>
        <p style={{ margin: "10px 0" }}>
          <strong>Name:</strong> {profile.name}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Email:</strong> {profile.email}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Favorite Food:</strong> {profile.favoriteFood.join(", ") || "No favorite food selected"}
        </p>
      </div>

      {/* Modal untuk Edit Profile */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ background: "#6b5b95", color: "white" }}
            >
              <h5 className="modal-title" id="editProfileModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ background: "white" }}
              ></button>
            </div>
            <div className="modal-body">
              {/* Form untuk mengedit data */}
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="favoriteFood" className="form-label">
                    Favorite Food
                  </label>
                  <select
                    multiple
                    className="form-control"
                    id="favoriteFood"
                    value={formData.favoriteFood || []}
                    onChange={handleChange}
                  >
                    {foodCategories.map((food) => (
                      <option key={food} value={food}>
                        {food}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
