import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthID = async () => {
    try {
        const value = await AsyncStorage.getItem("AuthId");
        if (value !== null) {
            const { authId, timestamp } = JSON.parse(value);
            const currentTime = Date.now();
            const duration = 8 * 60 * 60 * 1000; // 8 Hours

            if (currentTime - timestamp <= duration) {
                return authId;
            } else {
                removeAuthID();
                return '';
            }
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving Auth Id:', error);
        return '';
    }
};

export const storeAuthID = async (value) => {
    try {
        const timestamp = Date.now();
        const data = { authId: value, timestamp };
        await AsyncStorage.setItem("AuthId", JSON.stringify(data));
    } catch (error) {
        console.error('Error saving Auth Id:', error);
    }
};

export const removeAuthID = async () => {
    try {
        await AsyncStorage.removeItem("AuthId");
    } catch (error) {
        console.error('Error removing Auth Id:', error);
    }
};


export const getUserDetails = async () => {
    try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving User:', error);
        return '';
    }
};

export const storeUserDetails = async (value) => {
    try {
        await AsyncStorage.setItem("User", JSON.stringify(value));
    } catch (error) {
        console.error('Error saving User:', error);
    }
};

export const removeUserDetails = async () => {
    try {
        await AsyncStorage.removeItem("User");
    } catch (error) {
        console.error('Error removing User:', error);
    }
};


export const getBiometricsDetails = async () => {
    try {
        const value = await AsyncStorage.getItem("BiometricsDetails");
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return '';
        }
    } catch (error) {
        console.error('Error retrieving BiometricsDetails:', error);
        return '';
    }
};

export const storeBiometricsDetails = async (value) => {
    try {
        await AsyncStorage.setItem("BiometricsDetails", JSON.stringify(value));
    } catch (error) {
        console.error('Error saving BiometricsDetails:', error);
    }
};

export const removeBiometricsDetails = async () => {
    try {
        await AsyncStorage.removeItem("BiometricsDetails");
    } catch (error) {
        console.error('Error removing BiometricsDetails:', error);
    }
};


export const getScanHistoryData = async () => {
    try {
        const value = await AsyncStorage.getItem("ScanHistoryData");
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error retrieving ScanHistoryData:', error);
        return [];
    }
};

export const storeScanHistoryData = async (value) => {
    try {
        await AsyncStorage.setItem("ScanHistoryData", JSON.stringify(value));
    } catch (error) {
        console.error('Error saving ScanHistoryData:', error);
    }
};

export const removeScanHistoryData = async () => {
    try {
        await AsyncStorage.removeItem("ScanHistoryData");
    } catch (error) {
        console.error('Error removing ScanHistoryData:', error);
    }
};

export const getStoreListData = async () => {
    try {
        const value = await AsyncStorage.getItem("StoreList");
        if (value !== null) {
            const { data } = JSON.parse(value)
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error retrieving StoreList:', error);
        return [];
    }
};

export const storeStoreListData = async (value) => {
    try {
        await AsyncStorage.setItem("StoreList", JSON.stringify({ data: value }));
    } catch (error) {
        console.error('Error saving StoreList:', error);
    }
};

export const removeStoreListData = async () => {
    try {
        await AsyncStorage.removeItem("StoreList");
    } catch (error) {
        console.error('Error removing StoreList:', error);
    }
};