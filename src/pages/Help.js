import React, { Component } from "react";

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        'public/foto1.jpg',
        'public/foto2.jpg',
        'public/foto1.jpg'
      ]
    };
  }

  handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    this.setState({ photos: [...this.state.photos, ...photoURLs] });
  };

  componentWillUnmount() {
    this.state.photos.forEach((photo) => URL.revokeObjectURL(photo));
  }

  render() {
    const { photos } = this.state;

    return (
      <div className="container py-4">
        <h1 className="mb-4 text-center">Photo Gallery</h1>

        <div className="mb-3">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={this.handleFileUpload}
            className="form-control"
          />
        </div>

        <div className="row g-3">
          {photos.map((photo, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={photo}                      b
                  alt={`Uploaded ${index}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}git
                />
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