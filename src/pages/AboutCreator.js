import React, { Component } from "react";
import "../App.css"; // Tambahkan CSS eksternal untuk styling

class AboutCreator extends Component {
  render() {
    const creators = [
      {
        name: "AIKO HANAKO LASUT",
        photo: "/aiko.jpg",
        role: "PROJECT MANAGEMENT: CRUD Page, & Login",
        major: "Sistem Informasi",
        faculty: "FILKOM",
        semester: "Semester 3",
        message: "Awalnya terasa sulit, namun dengan tim yang mau bekerjasama jadi terasa lebih menyenangkan, exercises yang sir semmy berikan juga sangat membantu pembuatan, terimakasih ^^",
      },
      {
        name: "Ferdi Akson Mia",
        photo: "/kak ferdi.jpg",
        role: "DEVELOPER: Search Page, & Gallery Page",
        major: "Informatika",
        faculty: "FILKOM",
        semester: "Semester 5",
        message: "Saya belajar banyak tentang integrasi API selama pembuatan website ini.",
      },
      {
        name: "Michelle Heavenly Faith Sorongan",
        photo: "/micel.jpg",
        role: "DEVELOPER : Rekomendasi Page, & Design Display",
        major: "Informatika",
        faculty: "FILKOM",
        semester: "Semester 5",
        message: "i'm glad i have team mates like u guys! i've learn so much from u this far, thank you for surviving this whole semester!",
      },
      {
        name: "Jenifer Monalisa Massie",
        photo: "/kakjeje.jpg",
        role: "DEVELOPER:  Homepage",
        major: "Sistem Informasi",
        faculty: "FILKOM",
        semester: "Semester 5",
        message: "Koordinasi tim menjadi pengalaman yang sangat berharga bagi saya.",
      },
    ];

    return (
      <div className="about-creator">
        <h1>Tentang Pembuat Website</h1>
        <div className="creator-list">
          {creators.map((creator, index) => (
            <div key={index} className="creator-container">
              <div className="photo-section">
                <img src={creator.photo} alt={creator.name} className="creator-photo" />
                <h3 className="creator-name">{creator.name}</h3>
              </div>
              <div className="creator-info">
                <div className="labels">
                  <span className="label">{creator.major}</span>
                  <span className="label">{creator.faculty}</span>
                  <span className="label">{creator.semester}</span>
                </div>
                <div className="role-message">
                  <p className="role">
                    <strong>Bagian:</strong> {creator.role}
                  </p>
                  <div className="divider"></div>
                  <p className="message">
                    <strong>Kesan Pesan:</strong> {creator.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AboutCreator;
