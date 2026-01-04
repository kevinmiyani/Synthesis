import { useEffect, useState } from 'react';
import { getResponseFromSearch } from '../../api/utils';
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import productdata from '../../assets/productdata.json';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const [allData, setAllData] = useState(productdata);
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const seletedStore = useSelector(state => state[reducers.SelectedStoreDataReducer]);

    // UseStates
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDepts, setSelectedDepts] = useState(['ALL']);
    const [searchTimeout, setSearchTimeout] = useState('');

    // UseEffects
    useEffect(() => {
        selectedDepts?.includes('ALL') ? setAllData(productdata) : setAllData(productdata?.filter((item) => selectedDepts?.includes(item?.DepartmentName)));
    }, [selectedDepts])

    useEffect(() => {
        setSearch('');
        setSearchResults(allData);
    }, [allData])

    useEffect(() => {
        search.length > 0 ? handleSearch(search) : setSearchResults(allData);
    }, [search])

    useEffect(() => { setIsLoading(false) }, [searchResults])

    // Methods
    const handleSearch = async (keyword) => {
        setIsLoading(true);
        clearTimeout(searchTimeout);
        const id = setTimeout(async () => {
            const results = await localSearch(keyword);
            if (results?.length == 0 && keyword?.length >= 1) {
                setIsLoading(true);
                const params = {
                    Search: keyword,
                    Departments: selectedDepts?.toString() ?? 'ALL',
                }
                const res = await getResponseFromSearch(authToken, params);
                setSearchResults(res?.data?.responseData);
            }
            setSearchResults(results);
        }, 500);
        setSearchTimeout(id);
    };

    const localSearch = async (keyword) => {
        const tokens = keyword.toLowerCase().split(/\s+/).filter(Boolean);

        return allData.map(item => {
            let score = 0;
            let priority = null;

            const fields = [
                { value: item?.BrandKeywords, weight: 5 },
                { value: item?.PrimaryKeywords, weight: 4 },
                { value: item?.SecondaryKeywords, weight: 3 },
                { value: item?.PackageType, weight: 2 },
                { value: item?.IngredientsList, weight: 1 }
            ];

            tokens.forEach(token => {
                fields.forEach(({ value, weight }) => {
                    if (!value) return;

                    const words = value.toLowerCase().split(/[;,\s]+/);

                    if (words.some(word => word.startsWith(token))) {
                        score += weight * 2;
                        if (priority == null) priority = 5 - weight + 1;
                    } else if (words.some(word => !word.startsWith(token) && word.includes(token))) {
                        score += weight;
                        if (priority == null) priority = 5 - weight + 1;
                    }
                });
            });

            return score > 0 ? { ...item, score, priority: priority } : null;
        }).filter(Boolean).sort((a, b) => b.score - a.score || a.priority - b.priority);
    }

    return {
        allData,
        navigation,
        seletedStore,

        search, setSearch,
        isLoading, setIsLoading,
        searchResults, setSearchResults,
        selectedDepts, setSelectedDepts,

        handleSearch,
    };
};

export default useScreenHooks;