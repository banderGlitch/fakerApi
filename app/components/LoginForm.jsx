'use client'

import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../services/AuthContext';
import { Modal, Button, Form, Alert } from 'react-bootstrap';


// ✅ Zod schema for Login


export default function LoginForm() {
    const [email, setEmail] = useState("nernaykumar98@gmail.com")
    const [password, setPassword] = useState("test1234")
    const [error, setError] = useState(null)
    const { showLoginModal, setShowLoginModal, setIsAuthenticated ,setRegistrationModal } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await API.post("/login", {
                email, password
            });

            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setIsAuthenticated(true)
            setShowLoginModal(false);
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    useEffect(() => {
        console.log("showLoginModal", showLoginModal)

    }, [showLoginModal])

    if (!showLoginModal) return null;

    return (
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {error && <Alert variant="danger" className="py-1">{error}</Alert>}
                    <Button onClick={() => {setShowLoginModal(false),setRegistrationModal(true)} } >Registration</Button>
                    <Button type="submit" variant="primary" className="w-100">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}




// 'use client'

// import React, { useEffect, useState } from 'react';
// import API from '../api/axios';
// import { useAuth } from '../services/AuthContext';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';

// export default function LoginForm() {
//     const [email, setEmail] = useState("nernaykumar98@gmail.com")
//     const [password, setPassword] = useState("test1234")
//     const [error, setError] = useState(null)
//     const { showLoginModal, setShowLoginModal,setIsAuthenticated } = useAuth();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const res = await API.post("/login", {
//                 email, password
//             });

//             const { accessToken, refreshToken } = res.data;
//             localStorage.setItem("accessToken", accessToken);
//             localStorage.setItem("refreshToken", refreshToken);
//             setIsAuthenticated(true)
//             setShowLoginModal(false);
//         } catch (err) {
//             setError(err?.response?.data?.message || "Login failed");
//         }
//     };

//     useEffect(() => {
//         console.log("showLoginModal", showLoginModal)

//     }, [showLoginModal])

//     if (!showLoginModal) return null;

//     return (
//         <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Login</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//                 <Form onSubmit={handleLogin}>
//                     <Form.Group className="mb-3">
//                         <Form.Control
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Control
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     {error && <Alert variant="danger" className="py-1">{error}</Alert>}

//                     <Button type="submit" variant="primary" className="w-100">
//                         Login
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// }
