import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserInformation = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

type UserDetailStore = {
  details: UserInformation;
  setUserDetail: (detail: UserInformation) => void;
  removeUserDetail: () => void;
};

export const useUserDetails = create(
  persist<UserDetailStore>(
    (set, get) => ({
      details: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: ""
      },
      setUserDetail: (detail) => {
        const details = { ...get().details, ...detail };
        set({ details });
      },
      removeUserDetail: () => {
        const details = {
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: ""
        };
        set({ details });
      },
    }),
    {
      name: "@user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
