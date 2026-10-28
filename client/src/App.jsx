import { useState } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Students from "./Pages/Students";
import "./App.css";

function loggin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
}

function Registration() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile_number: "",
        course: "",
        gender: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
      if(email) {

      }
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Registration failed"
                );
            }

            setMessage(result.message);

            setFormData({
                name: "",
                email: "",
                mobile_number: "",
                course: "",
                gender: ""
            });
        } catch (err) {
            setError(err.message || "Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Student Registration</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        maxLength={15}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="course">Course</label>
                    <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="Java">Java</option>
                        <option value="React.js">React.js</option>
                        <option value="MySql">MySql</option>
                        <option value="Python">Python</option>
                        <option value="AI/ML">AI/ML</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Gender</label>

                    <div className="gender-options">
                        {["Male", "Female", "Other"].map((gender) => (
                            <label key={gender}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleChange}
                                    required
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register Student"}
                </button>
            </form>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <div className="navigation">
                <Link to="/students" className="back-link">
                    View All Students
                </Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/students" element={<Students />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
