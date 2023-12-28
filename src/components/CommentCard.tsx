import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { baseImagePath } from '../api/apicalls';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CommentCard = (props: any) => {
    return (
        <TouchableOpacity>
            <View style={{ ...styles.container, maxWidth: props.cardWidth - 50 }}>
                <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[styles.cardImage, { width: props.cardWidth / 10, height: props.cardWidth / 10 }]} source={props.imagePath ? { uri: baseImagePath('w342', props.imagePath) } : require('../assets/image/avatar-comment.jpg')} />
                        <Text style={styles.textTitle}>{props.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {!props.rating ?
                            (
                                <View></View>
                            ) :
                            (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Text style={styles.text}>{props.rating}</Text>
                                    <AntDesign name="star" size={14} color={COLORS.Yellow} />
                                </View>
                            )
                        }
                    </View>
                </View>
                <View>
                    <Text numberOfLines={10} style={styles.text}>{props.content}</Text>
                </View>
                <View style={{ height: 0.7, width: '70%', backgroundColor: COLORS.WhiteRGBA50, alignSelf: 'center' }}></View>
            </View>
        </TouchableOpacity>
    )
}

export default CommentCard;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Grey,
        gap: 10,
        paddingBottom: 8,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    cardImage: {
        aspectRatio: 1 / 1,
        borderRadius: 20,
    },
    textTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.White,
        textAlign: 'center',
        marginLeft: 10,
    },
    text: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 12,
        color: COLORS.White,
    },
    nameContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})