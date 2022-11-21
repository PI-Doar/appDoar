import React from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import usuarioService from '../services/UsuarioServices';

const schema = yup.object({
    nome: yup.string().required("Informe seu nome"),
    email: yup.string().email("Email invalido").required("Infome seu email"),
    senha: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Infome sua senha")
})

export default ({ navigation }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })




    const addCadastro = async (data) => {

        const novoCadastro = {
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }

        usuarioService.cadastrar(novoCadastro)
            .then((response) => {
                const titulo = (response.data.status) ? "Sucesso" : "Erro"
                Alert.alert(titulo, response.data.mensagem)
            })
            .catch((error) => {
                Alert.alert("Erro", "Houve um erro inesperado")
            })

        navigation.navigate('boasVindas')

    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.viewPrincipal}>

            <Animatable.View animation="fadeInUp" delay={500} style={styles.contaierHeader}>
                <Text style={styles.message}>Cadastro</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.contaierForm} >


                <Text style={styles.title}>Nome</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Digite apenas o seu nome"
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>}

                <Text style={styles.title}>E-mail</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Digite o seu e-mail"
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
                            placeholder="Digite o seu e-mail"
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}


                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(addCadastro)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
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
    }


})