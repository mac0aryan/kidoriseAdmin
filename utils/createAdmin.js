const Admin = require('../schemas/adminSchema');
const bcrypt = require('bcryptjs');
const createAdmin = async () => {
    const firstName = "Admin"
    const lastName = "Kidorise"
    const email = 'admin@kidorise.in'
    const password = 'kidorise@2025'
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const admin = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,

        });
        console.log("Admin created")
    } catch (error) {
        console.log("Can't create Admin")
    }
}

module.exports = createAdmin