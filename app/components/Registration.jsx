'use client'

import React from "react"
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../services/AuthContext";
import API from "../api/axios";
import { Modal, Button, Form, Alert } from 'react-bootstrap';

// ✅ Zod schema for Registration

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const schema_registration = z.object({
    name: z.string().min(2, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 character"),
    email: z.string().email("Email a valid is required"),
    password: z.string().min(8, "Password must be at least 8 character long").regex(strongPasswordRegex, "Password must include uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})





export default function Registration() {

    const { setShowLoginModal ,setRegistrationModal ,showRegistrationModal } = useAuth();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(schema_registration)
    })

    const onSubmit = (data) => {
        console.log("✅ Form submitted:", data);
        reset();
        onHide();
        Alert("User register successfully")
    }

    if (!showRegistrationModal) return null;


    return (
        <Modal show={showRegistrationModal} onHide={() => setRegistrationModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.name}
                            {...register("name")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Username */}
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            isInvalid={!!errors.username}
                            {...register("username")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            isInvalid={!!errors.email}
                            {...register("email")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!errors.password}
                            {...register("password")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Confirm Password */}
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            isInvalid={!!errors.confirmPassword}
                            {...register("confirmPassword")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword?.message}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button type="submit" variant="primary" className="w-100">
                        Register
                    </Button>

                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Button
                            variant="link"
                            className="p-0"
                            onClick={() => {setRegistrationModal(false), setShowLoginModal(true)}}
                        >
                            Login here
                        </Button>
                    </p>

                </Form>
            </Modal.Body>

        </Modal>
    )
}