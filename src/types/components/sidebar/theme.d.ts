declare const sidebar: {
    base: string;
    container: {
        base: string;
        side: {
            left: string;
            right: string;
        };
    };
    content: {
        base: string;
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
    };
    header: string;
    title: string;
    closeIcon: string;
    footer: string;
    timeSlot: string;
    overlay: string;
    navigation: {
        base: string;
        item: {
            base: string;
            icon: string;
            label: string;
            badge: string;
            image: string;
            states: {
                active: string;
                background: string;
                special: string;
            };
            variants: {
                'component-a': string;
                'component-b': string;
                'component-c': string;
                'component-d': string;
            };
        };
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
    };
};
export type SidebarUi = typeof sidebar;
export type SidebarNavigationUi = typeof sidebar.navigation;
export default sidebar;
