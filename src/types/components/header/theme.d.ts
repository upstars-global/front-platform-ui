declare const header: {
    base: string;
    chatButton: {
        base: string;
        badge: string;
        icon: string;
    };
    container: {
        base: string;
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
            simple: string;
        };
    };
    content: string;
    inner: {
        base: string;
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
            simple: string;
        };
    };
    logo: string;
    navigation: {
        base: string;
        container: string;
        hiddenContent: string;
        hiddenLink: string;
        item: {
            base: string;
            badge: string;
            icon: string;
            states: {
                active: string;
                background: string;
                special: string;
            };
        };
    };
    wrapper: string;
};
export type HeaderUi = typeof header;
export type HeaderNavigationUi = typeof header.navigation;
export type ChatButtonUi = typeof header.chatButton;
export default header;
