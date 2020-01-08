/**reusable modal container */
import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Spinner } from './Spinner';
import { AirbnbRating } from 'react-native-ratings';
import { BLUE, BLUE_DARK, RED } from './Colors';
import { CardSection} from './CardSection';
import { Card} from './Card';
import { Button } from './Button';
const RatingModal = ({ children, visible, ratingCompleted, onAccept, onDecline }) => {
    const { textStyle, containerStyle } = styles;
    return (
        <Modal
	        visible={visible}
	        transparent
	        animationType='fade'
	        onRequestClose={() => {}}
        >
            <View style={containerStyle}>
            	<Card style={{borderWidth: 3, borderColor: RED, borderRadius: 10}}>
                <CardSection style={[styles.cardSectionStyle, {borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius:0, borderBottomRightRadius:0  }]}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                <CardSection style={[styles.cardSectionStyle, {borderRadius: 0 }]}>
		            <AirbnbRating
		              count={6}
		              reviews={["Terrible", "Bad", "OK", "Good", "Very Good", "Excellent"]}
		              defaultRating={3}
		              size={20}
		              onFinishRating={(rating)=>ratingCompleted(rating)}
		              selectedColor={BLUE}
		            />
                </CardSection>
                <CardSection
                  style={[styles.cardSectionStyle, {borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius:5, borderBottomRightRadius:5  }]}
                >
                    <Button 
                    onPress={onDecline}
                    style={{ backgroundColor: BLUE }}
                    underlayColor={BLUE_DARK}
                    >
                    CANCEL
                    </Button>
                    <Button 
                    onPress={onAccept}
                    style={{ backgroundColor: BLUE }}
                    textStyle={{ color: '#fff' }}
                    underlayColor={BLUE_DARK}
                    >
                    SUBMIT
                    </Button>
          	    </CardSection>
          	    </Card>
            </View>	
        </Modal>
    );
};
const styles = {
    containerStyle: {
        backgroundColor: 'rgba(26, 85, 164, 0.5)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },
    cardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop:0,
        marginBottom: 0
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: BLUE,
        fontWeight: 'bold'
    }
};

export { RatingModal };
