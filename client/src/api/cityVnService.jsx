import axios from 'axios';

export async function GetProvincesFromVnApi() {
    const response = await axios.get('https://provinces.open-api.vn/api/p/');
    return response.data;
}

export async function GetDistrictsFromVnApi() {
    const response = await axios.get(`https://provinces.open-api.vn/api/d/`);
    return response.data;
}

export async function GetWardsFromVnApi() {
    const response = await axios.get(`https://provinces.open-api.vn/api/w/`);
    return response.data;
}

export async function GetDistrictByProvinceApi(codeId) {
    try {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${codeId}`,
            {
                params: {
                    depth: 2,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function GetWardByDistrictApi(codeId) {
    try {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${codeId}`,
            {
                params: {
                    depth: 2,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
