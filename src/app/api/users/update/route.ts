// Import necessary modules and initialize database connection
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

// Define PUT request handler to update user details
export async function PUT(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        const { name, gender, dateOfBirth } = reqBody;

        // Find the user by email
        const user = await User.findOneAndUpdate(
            { email: reqBody.email }, // Assuming email is unique identifier
            { name, gender, dateOfBirth },
            { new: true } // Return the updated document
        );

        // Check if user exists
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return success response with updated user details
        return NextResponse.json({
            message: "User details updated successfully",
            success: true,
            updatedUser: user,
        });
    } catch (error: any) {
        // Handle errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
