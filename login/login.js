import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';
import { Checkbox } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import usuarioService from '../services/UsuarioServices';
import AsyncStorage from "@react-native-async-storage/async-storage"


const schema = yup.object({
    email: yup.string().email("Email inválido").required("Infome seu email"),
    senha: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Infome sua senha")
})


export default ({ navigation }) => {

    const { control, handleSubmit, formState: { errors, }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { email: '', senha: '' }
    })

    const [isLoadingToken, setLoadingToken] = useState(true)

    const Acessar = async (data) => {

        const login = {
            username: data.email,
            password: data.senha
        }

        usuarioService.login(login)
            .then((response) => {
                navigation.reset({ index: 0, routes: [{ name: 'list' }] })
            })
            .catch((error) => {
                Alert.alert("Usuário inválido")
            })

    }

    const logarComToken = (token) => {
        setLoadingToken(true)
        let login = {
            token: token
        }

        usuarioService.loginComToken(login)
            .then((response) => {
                setLoadingToken(false)
                navigation.reset({ index: 0, routes: [{ name: 'list' }] })
            })
            .catch((error) => {
            })

    }

    useEffect(() => {

        AsyncStorage.getItem("TOKEN").then((token) => {
            logarComToken(token)
        })
    }, [])

    const [senhaVisivel, setSenhaVisivel] = useState(true)
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.viewPrincipal}>


            <Animatable.View animation="fadeInUp" delay={500} style={styles.contaierHeader}>
                <Text style={styles.message}>Bem-vindo</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.contaierForm} >

                <Text style={styles.title}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Digite um e-mail"
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

                <Text style={styles.title}>Senha</Text>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry={senhaVisivel}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Sua senha"
                            style={styles.input}
                        />
                    )}
                />
                {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        checked ? setSenhaVisivel(true) : setSenhaVisivel(false)

                        setChecked(!checked);
                    }}
                    color={'green'}
                />
                <Text style={styles.exibirSenhaText}>Exibir senha</Text>



                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(Acessar)}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('cadastro')}>
                    <Text style={styles.RegisterText}>Não possui uma conta? Cadastre-se.</Text>
                </TouchableOpacity>


            </Animatable.View>

        </View>

    )
}


const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#001219',

    },
    contaierHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    message: {
        fontSize: 28,
        fontWeigt: 'bold',
        color: 'white'
    },
    contaierForm: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 25,
        borderToprightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeigt: 'bold',
        color: 'white'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    RegisterText: {

        color: 'gray'
    },
    labelError: {
        alignSelf: 'flex-start',
        color: 'red',
        marginBottom: 8
    },
    exibirSenhaText: {

        color: 'gray'
    }


})
