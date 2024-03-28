// Import necessary modules and initialize database connection
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Establish database connection
connect();

// Define POST request handler to update user's password
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, currentPassword, newPassword } = reqBody;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Compare current password
        const validPassword = await bcryptjs.compare(currentPassword, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
