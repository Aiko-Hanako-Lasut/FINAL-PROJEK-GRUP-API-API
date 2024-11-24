import React, { Component } from "react";

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Array awal berisi jalur gambar lokal dan judulnya
      photos: [
        { src: '/k1.jpg', title: 'Martabak' },
        { src: '/mie ayam.jpg', title: 'Mie ayam' },
        { src: '/Sate1.jpg', title: ' Sate Ayam' },
        { src: '/ikan goreng.jpg', title: 'Ikan goreng' },
        { src: '/NK.jpg', title: 'Nasi Kuning' },
        { src: '/NS1.jpg', title: 'Nasi goreng' }
      ]
    };
  }

  handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const photoURLs = files.map((file) => ({
      src: URL.createObjectURL(file),
      title: file.name // Menggunakan nama file sebagai judul default
    }));
    this.setState({ photos: [...this.state.photos, ...photoURLs] });
  };

  componentWillUnmount() {
    this.state.photos.forEach((photo) => URL.revokeObjectURL(photo.src));
  }

  render() {
    const { photos } = this.state;

    return (
      <div className="container py-4">
        <h1 className="mb-4 text-center">Photo Gallery</h1>

        <div className="mb-3">
         
          
        </div>

        <div className="row g-3">
          {photos.map((photo, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={photo.src}
                  alt={`Uploaded ${index}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{photo.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="text-center text-muted mt-4">
            No photos uploaded. Please select files to display in the gallery.
          </p>
        )}
      </div>
    );
  }
}

export default PhotoGallery;
