import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { useEffect, useState } from "react";
import { ScanHistoryTab } from "../../constants/Helper";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const allData = useSelector(state => state[reducers.RecentScanDataReducer]);

    // UseStates
    const [seletedTabValue, setSelectedTabValue] = useState(ScanHistoryTab[0]);
    const [data, setData] = useState(allData);

    // UseEffects
    useEffect(() => {
        arrageData(seletedTabValue, allData);
    }, [allData])

    // Methods
    const arrageData = (seletedTabValue, allData) => {
        seletedTabValue == ScanHistoryTab[0]
            ?
            setData(allData)
            :
            setData(allData
                ?.filter(item => item?.Count > 3) // Count for frequency
                ?.sort((a, b) => b?.Count - a?.Count)
                ?.slice(0, 20));
    }

    const onTabSelect = (tab) => {
        setSelectedTabValue(tab);
        arrageData(tab, allData);
    }

    return {
        data,
        navigation,
        seletedTabValue,

        onTabSelect,
    };
};

export default useScreenHooks;