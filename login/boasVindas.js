import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable'

export default ({ navigation }) => {


    return (
        <View style={styles.viewPrincipal}>


            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../assets/logoDoar.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.contaierForm}>
                <Text style={styles.title}>Doar</Text>
                <Text style={styles.text}>Seja bem vindo (a) ao Doar o app que te conecta a quem precisa da sua ajuda.</Text>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => navigation.navigate('login')} >
                    <Text style={styles.botaoText}> Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#001219'

    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    contaierForm: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12

    },
    botao: {
        position: 'absolute',
        backgroundColor: 'green',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    botaoText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})

