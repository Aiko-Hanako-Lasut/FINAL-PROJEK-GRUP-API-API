import React from "react";

const ResponsiveCard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-6 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 1</h5>
              <p className="card-text">This is a responsive card.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card 2</h5>
              <p className="card-text">This is another card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCard;
