const { User, Profile } = require('../models')

const createUserAndProfile = async () => {
    try {
        const user = await User.create({
            is_active: 0,
            email: "mar10jul1964@gmail.com",
            password: "903610" 
        })
        const profile = await Profile.create({
            firstName: 'Marcos',
            lastName: 'Albuquerque',
            picture: 'profile.jpg',
            bio: 'Dentist',
            userId: user.id
        })
        console.log('User and Profile created:', user, profile)
    } catch(error) {
        console.error('Error creating User and Profile:', error)
    }
}

createUserAndProfile()