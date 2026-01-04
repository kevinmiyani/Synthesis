export const navigationToNavigate = (navigation, screen, params = {}) => {
    return navigation.navigate(screen, params);
}

export const navigationToReplace = (navigation, screen, params = {}) => {
    return navigation.replace(screen, params);
}

export const navigationToReset = (navigation, screen) => {
    return navigation.reset({
        index: 0,
        routes: [{ name: screen }],
    });
}