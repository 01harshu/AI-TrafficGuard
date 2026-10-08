import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a video first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      setMessage("✅ Video uploaded successfully!");
      console.log(data);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🚦 AI TrafficGuard</div>

        <div className="nav-links">
          <span>Dashboard</span>
          <span>Video Analysis</span>
          <span>Violations</span>
          <span>Analytics</span>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <div>
            <p className="tag">AI-POWERED TRAFFIC MONITORING</p>

            <h1>
              Smarter Roads.
              <br />
              Safer Traffic.
            </h1>

            <p className="description">
              Upload traffic footage and use AI to detect dangerous driving
              and traffic violations automatically.
            </p>

            <input
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              id="video-upload"
              onChange={handleFileChange}
            />

            <label htmlFor="video-upload" className="upload-btn">
              Choose Traffic Video
            </label>

            {selectedFile && (
              <p style={{ marginTop: "15px" }}>
                Selected: <strong>{selectedFile.name}</strong>
              </p>
            )}

            {selectedFile && (
              <button
                className="upload-btn"
                onClick={handleUpload}
                disabled={uploading}
                style={{ marginTop: "15px", marginLeft: "10px" }}
              >
                {uploading ? "Uploading..." : "Upload Video"}
              </button>
            )}

            {message && (
              <p style={{ marginTop: "15px", fontWeight: "600" }}>
                {message}
              </p>
            )}
          </div>

          <div className="hero-card">
            <div className="camera-icon">📹</div>

            <h3>AI Video Analysis</h3>

            <p>
              Detect traffic violations, identify vehicles and generate
              evidence automatically.
            </p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>0</h3>
            <p>Total Vehicles</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Total Violations</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>High Risk Vehicles</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Today's Violations</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;