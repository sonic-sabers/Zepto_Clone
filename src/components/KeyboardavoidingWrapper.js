import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { } from 'react-native-gesture-handler'

export default function KeyboardavoidingWrapper({ children, style,styles }) {
    return (
        <KeyboardAvoidingView style={[{ flex: 1 }, style]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{
                    flex: 1,
                }}
                    contentContainerStyle={styles}

                >
                    {/* <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '400',
                            fontFamily: 'Poppins-Regular',
                            color: '#000'
                        }}>
                        text
                    </Text> */}
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})