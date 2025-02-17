import { useEffect } from "react";

export function usePageStyle() {
    useEffect(() => {
        const mainContent: any = document.querySelector('.main-content');
        const footer: any = document.querySelector('.footer');

        if (mainContent) {
            mainContent.style.padding = `0`;
            mainContent.classList.add('bg-white', 'dark:bg-bodybg2');
        }
        if (footer) {
            footer.style.display = `none`;
        }

        return () => {
            if (mainContent) {
                mainContent.style.padding = `0 1rem`;
                mainContent.classList.remove('bg-white', 'dark:bg-bodybg2');
            }
            if (footer) {
                footer.style.display = `block`;
            }
        };
    }, []);
}
