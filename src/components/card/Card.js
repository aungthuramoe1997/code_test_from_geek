import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';
import {DefaultText} from '../text';

const Card = ({card, onSelect}) => {
  const [isSelected, setIsSelected] = useState(false);
  const clickSelect = () => {
    setIsSelected(!isSelected);
    onSelect(card);
  };
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={{uri: card.images.large}}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={styles.card}>
        <DefaultText style={styles.name}>{card.name}</DefaultText>
        <DefaultText
          style={{marginVertical: Spacing.spacing4, color: '#0F6DB0'}}>
          {card.rarity}
        </DefaultText>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <DefaultText style={{color: '#6A6969'}}>
            ${` ${card.cardmarket.prices.lowPrice}`}
          </DefaultText>
          <DefaultText
            style={{marginStart: Spacing.spacing32, color: '#6A6969'}}>
            {card.set.total} Left
          </DefaultText>
        </View>
      </View>
      <Pressable
        onPress={clickSelect}
        style={[
          styles.button,
          {
            backgroundColor: isSelected
              ? Colors.unSelectedButton
              : Colors.selectedButton,
          },
        ]}>
        <DefaultText
          style={{color: isSelected ? Colors.white : Colors.primaryColor}}>
          SELECTED
        </DefaultText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.spacing8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 220,
    width: '40%',
    borderRadius: 8,
    zIndex: 1,
  },
  card: {
    minHeight: 150,
    paddingTop: Spacing.spacing32,
    width: '70%',
    marginHorizontal: '15%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: -48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: Typography.text18,
    fontWeight: '900',
  },
  button: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginTop: -16,
    borderRadius: 20,
  },
});

export default React.memo(Card);
