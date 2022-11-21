import React from "react";
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SeparatorItem } from "../List/separacao";
import ListFeed from "../List/ListFeed";
import dados from "../dados/dados";


export default ({ navigation }) => {


    const logout = () => {
        AsyncStorage.removeItem('TOKEN').then(async () => {
            let teste = await AsyncStorage.getItem('TOKEN')
            navigation.reset({
                index: 0,
                routes: [{ name: "boasVindas" }]
            })
        }).catch((error) => {
            Alert.alert("Erro ao sair")
        })
    }

    return (

        <Provider>
            <View style={styles.viewPrincipal}>

                <FlatList
                    data={dados}
                    renderItem={({ item }) => <ListFeed descricao={item.descricao} nome={item.nome} imagem={item.imagem} url={item.site} />}
                    ItemSeparatorComponent={SeparatorItem}
                    keyExtractor={(item, index) => index}
                />
                <Button
                    mode="contained"
                    buttonColor="#25ccb0"
                    textColor="white"
                    onPress={() => logout()}
                >
                    Sair
                </Button>


            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1
    }
})

