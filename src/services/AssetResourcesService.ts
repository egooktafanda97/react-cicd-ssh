import store from "@/redux/store";

export const authAvatarImageUrl = (): string => {
    const user: any = store.getState().auth?.user ?? null;
    return `${import.meta.env.VITE_BASE_API}/users/${user?.avatar ?? 'user-default.png'}`
}