import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BottomTabHeight, screenWidth } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import TabButton from './TabButton';

const TabBar = (props) => {

    const TabButtonWidth = screenWidth / props.state.routes.length;

    return (
        <View
            style={[styles.Container,]}
        >
            <View style={styles.BarStyle}>
                {
                    props.state.routes.map((route, i) => {

                        const { options } = props.descriptors[route.key];
                        const label = options.title;
                        const icon = options.tabBarIcon;
                        const focused = props.state.index === i;

                        const onPress = () => {
                            const event = props.navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!focused && !event.defaultPrevented) {
                                props.navigation.navigate(route.name);
                            }
                        };

                        return (
                            <TabButton
                                key={i}
                                label={label}
                                icon={icon}
                                focused={focused}
                                onPress={onPress}
                                buttonSize={TabButtonWidth}
                            />
                        )
                    })
                }
            </View>

        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: BottomTabHeight,
        backgroundColor: COLOR.BLACK,
        elevation: 5,
        shadowColor: COLOR.GRAY,
        shadowOffset: { height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    BarStyle: {
        width: '100%',
        height: "100%",
        flexDirection: 'row',
        zIndex: 10,
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})