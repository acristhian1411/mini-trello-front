import { create } from 'zustand';

export const usePermissionsStore = create((set, get) => ({
  permissions: [],
  setPermissions: (perms) => set({ permissions: perms }),
  hasPermission: (perm) => get().permissions.includes(perm),
}));
