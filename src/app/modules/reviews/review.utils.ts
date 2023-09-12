
export const authorizedUserCheck = async (userPhoneNumber, id): Promise<string | undefined> => {
    const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
  };