import React, { useCallback } from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity, Linking} from 'react-native';


export default ({ descricao, nome, imagem, url}) => {
  const supportedURL = url;

 const unsupportedURL = "sla://open?team=123456";
    
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Site inacessível no momento: ${url}`);
        }
      }, [url])


    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
        >
            
                <Image style={{ width: 120, height: 100 }} source={imagem} />
                <View style={styles.content}>
                    <Text style={styles.title}>{nome}</Text>
                    <Text numberOfLines={5} style={styles.descricao}>
                        {descricao}
                    </Text>
                    
                </View>
            
            </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 20,
    },

    content: {
        flex: 1,
        marginLeft: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#6F4E37",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: "#000",
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'white', padding: 20

     }
});
