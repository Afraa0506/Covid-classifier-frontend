import { useState } from "react";

export default function UploadCard() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [allProbs, setAllProbs] = useState(null);
  const [gradCam, setGradCam] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction("");
    setAllProbs(null);
    setGradCam(null);
  };

  const handlePredict = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const res = await fetch("https://covid-classifier-backend.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setPrediction("Error: " + data.error);
      } else {
        setPrediction(data.prediction + " (" + data.confidence + "%)");
        setAllProbs(data.all_probs); // for confidence bars
        setGradCam(data.gradcam); // base64 Grad-CAM
      }
    } catch (err) {
      console.error(err);
      setPrediction("Error contacting API");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="main-heading">COVID-19 X-Ray Classifier</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input"
      />

      {preview && (
        <img src={preview} alt="preview" className="preview-img" />
      )}

      <button onClick={handlePredict} className="predict-btn" disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {loading && <div className="spinner"></div>}

      {prediction && (
        <div className="result">
          <p>{prediction}</p>
          {allProbs && (
            <div className="confidence-bars">
              {Object.entries(allProbs).map(([cls, val]) => (
                <div key={cls} className="bar-container">
                  <span>{cls}</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{ width: val + "%" }}
                    ></div>
                  </div>
                  <span>{val}%</span>
                </div>
              ))}
            </div>
          )}
          {gradCam && (
            <div>
              <p>Grad-CAM Heatmap:</p>
              <img src={`data:image/png;base64,${gradCam}`} alt="Grad-CAM" className="gradcam-img"/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
