import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/students"
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch students"
                    );
                }

                setStudents(result);
            } catch (err) {
                setError(err.message || "Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <div className="students-container">Loading students...</div>;
    }

    if (error) {
        return (
            <div className="students-container">
                <p className="error-message">{error}</p>
                <Link to="/">Back to Registration</Link>
            </div>
        );
    }

    return (
        <div className="students-container">
            <h1>Registered Students</h1>

            <Link to="/" className="back-link">
                + Register New Student
            </Link>

            {students.length === 0 ? (
                <p>No students registered yet.</p>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Course</th>
                                <th>Gender</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile_number}</td>
                                    <td>{student.course}</td>
                                    <td>{student.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Students;