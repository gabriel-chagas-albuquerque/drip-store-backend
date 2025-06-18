const { User, Profile } = require('../models');

const fetchUserWithProfile = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Profile
      }
    });
    console.log(user);
  } catch (error) {
    console.error('Error fetching user with profile:', error);
  }
};

fetchUserWithProfile(1);