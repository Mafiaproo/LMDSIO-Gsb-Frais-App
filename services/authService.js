import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../config";

export async function signIn(login, pwd)
{
    const response = await fetch(`${API_URL}visiteur/auth`, { 
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({login, pwd}),
    });

    const data = await response.json();

    console.log("Data : ");
    console.log(data);

    if(data.access_token)
    {
        await AsyncStorage.setItem('token', data.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(data.visiteur));
    }
    return data;
};

export async function signOut()
{
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
}
