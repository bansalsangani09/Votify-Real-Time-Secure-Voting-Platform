import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './modules/auth/auth.model.js';

const MONGO_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@voting.com';
        const adminPassword = 'StrongPassword123';
        const adminName = 'System Admin';

        const userExists = await User.findOne({ email: adminEmail });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);

        if (userExists) {
            userExists.passwordHash = passwordHash;
            userExists.role = 'admin'; // Ensure correct role
            await userExists.save();
            console.log('Admin user updated with new password and role: admin');
        } else {
            await User.create({
                name: adminName,
                email: adminEmail,
                passwordHash,
                role: 'admin'
            });
            console.log('Admin user created successfully with role: admin');
        }

        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
