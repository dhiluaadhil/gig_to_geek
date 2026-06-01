import api from './api';

export const profileService = {
  updateProfile: async (profileData: any) => {
    const res = await api.patch('/auth/me', profileData);
    return res.data;
  },
};
