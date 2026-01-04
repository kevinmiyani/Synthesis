import RNFS from 'react-native-fs';

const getCurrentDateString = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(/ /g, '_').replace(',', '');
};

const dailyDataDir = `${RNFS.DocumentDirectoryPath}/ScanningData`;

const ensureDirectoryExists = async () => {
    const dirExists = await RNFS.exists(dailyDataDir);
    if (!dirExists) {
        await RNFS.mkdir(dailyDataDir);
    }
};

const getDailyFilePath = () => {
    const fileName = `${getCurrentDateString()}.json`;
    return `${dailyDataDir}/${fileName}`;
};

const initializeDailyFile = async () => {
    await ensureDirectoryExists();
    const filePath = getDailyFilePath();
    const fileExists = await RNFS.exists(filePath);

    if (!fileExists) {
        await RNFS.writeFile(filePath, JSON.stringify([]), 'utf8');
    }

    return filePath;
};

const getCurrentTimeString = () => {
    const date = new Date();
    return date.toISOString();
};

export const dumpScanningDataIntoLocal = async (data) => {
    const filePath = await initializeDailyFile();

    const currentData = await RNFS.readFile(filePath, 'utf8')
        .then((content) => JSON.parse(content))
        .catch(() => []);

    currentData.push({ ...data, timestamp: getCurrentTimeString(), });
    await RNFS.writeFile(filePath, JSON.stringify(currentData), 'utf8').then(() => {
        // console.log(`Data Dump : ${filePath}`)
    }).catch(console.log);
};
