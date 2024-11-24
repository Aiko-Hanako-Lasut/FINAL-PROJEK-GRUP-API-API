import React, { Component } from "react";

class Rekomendasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      videos: [
        {
          url: "https://youtu.be/Y3duOnIpRK0?si=mwwxsacFYxg0yzyU",
          title: "MULAI SEKARANG AKU AJARIN MASAK MURAH MERIAH DARI TAHU NGALAHIN DAGING !",
        },
        {
          url: "https://youtu.be/5VI2DRgsXdw?si=b0EDd-Cr35TE0Hv4",
          title: "SOP AYAM SEDERHANA - SIMPLE ENAK",
        },
        {
          url: "https://youtu.be/yytYsSq8SdQ?si=oXq82Atbc0MzD8vA",
          title: "SEUMUR HIDUPKU BARU TAU CARA BUAT TELUR SEPERTI INI, ENAK BIKIN KETAGIHAN",
        },
        {
          url: "https://youtu.be/VFTc6bO-muk?si=Lg_TnPhBPJHZx8YH",
          title: "GAK PERNAH BOSEN !! TELUR DIMASAK GINI ,BUMBUNYA MERESAP ,ENAK BANGET",
        },
        {
          url: "https://youtu.be/IzJLChBqG6I?si=cmpLPTr3ZWx9YlUe",
          title: "CEMILAN 2 BAHAN MODAL TEPUNG DAN AIR DIADUK ADUK JADIDEH CEMILAN ENAK DAN PRAKTIS",
        },
        {
          url: "https://youtu.be/UXj_ZGjT6xI?si=sHo3NLfVj1ZOv0fR",
          title: "Olahan Kentang Gampang Tapi Enak ! Resep Cimol Kentang",
        },
        {
          url: "https://youtu.be/k-MuTROEoPI?si=dKznA9xxvKtKxtT3",
          title: "RESEP CEMILAN TAHU WALIK KRISPI EKONOMIS,,MESKI DINGIN TETAP KENYAL DAN LEMBUT, PAS UNTUK IDE JUALAN",
        },
        {
          url: "https://youtu.be/C9bPW-RWbnk?si=hxRxg0lNieV7oSJ6",
          title: "Bola-Bola Milo Tanpa Dcc Tanpa Dimasak",
        },
      ],
    };
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, videos } = this.state;

    // Filter videos based on search term in title
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div style={{ padding: "20px" }}>
        <h2>Rekomendasi Video Tutorial</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari video..."
          value={searchTerm}
          onChange={this.handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />

        {/* Video Containers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column", // Stack the content vertically
                justifyContent: "space-between", // Ensure the title is at the bottom
                height: "350px", // Set a fixed height for consistency
              }}
            >
              <iframe
                width="100%"
                height="200"
                src={video.url.replace("youtu.be", "www.youtube.com/embed").split('?')[0]} // Remove query string
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <h3
                style={{
                  marginTop: "10px", // Add some space above the title
                  fontSize: "14px", // Smaller font size
                  color: "#333", // Slightly darker color for the title
                  textAlign: "center", // Center the title text
                }}
              >
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Rekomendasi;