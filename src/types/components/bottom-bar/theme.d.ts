declare const bottomBar: {
    base: string;
    buttonGroup: string;
    container: string;
    navigation: {
        base: string;
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
        states: {
            loggedIn: {
                'component-a': string;
                'component-b': string;
                'component-c': string;
                'component-d': string;
            };
        };
    };
    action: {
        base: string;
        icon: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
        label: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
        variants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
    };
    item: {
        base: string;
        label: string;
        badge: string;
        icon: string;
        states: {
            active: string;
        };
        labelVariants: {
            'component-a': string;
            'component-b': string;
            'component-c': string;
            'component-d': string;
        };
        wrapper: string;
    };
    variants: {
        'component-a': string;
        'component-b': string;
        'component-c': string;
        'component-d': string;
    };
};
export type BottomBarUi = typeof bottomBar;
export default bottomBar;
