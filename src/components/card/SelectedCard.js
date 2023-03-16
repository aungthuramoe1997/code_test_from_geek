import React, {useState, useRef} from 'react';
import {Pressable, StyleSheet, View, Image} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';
import {DefaultText} from '../text';
import {FontAwesomeIcon, AntDesignIcon} from '../icon/Icon';
import TEXT from '../../values/Text';

const SelectedCard = ({card, addQuantity,onDelete}) => {
  const [count, setCount] = useState(1);
  const countRef = useRef(1);
  const onAdd = () => {
    if (countRef.current < card.set.total) {
      setCount(prev => prev + 1);
      countRef.current = countRef.current + 1;
    }
  };
  const onDeleteCard = () => {
    if (countRef.current === 1) {
        onDelete(card)
    } else {
      countRef.current = countRef.current - 1;
      setCount(prev => prev - 1);
    }
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
        <View style={{justifyContent: 'space-around'}}>
          <DefaultText style={styles.name}>{card.name}</DefaultText>
          <DefaultText>
            ${` ${card.cardmarket.prices.lowPrice} per card`}
          </DefaultText>
        </View>
        <DefaultText style={{color: '#6A6969'}}>
          {' '}
          <DefaultText style={{color: Colors.red, fontWeight: '700'}}>
            {card.set.total - count}{' '}
          </DefaultText>
          cards Left
        </DefaultText>
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <Pressable
            style={{position: 'absolute', top: -8, left: 14}}
            onPress={onAdd}>
            <AntDesignIcon name={'up'} size={12} color={Colors.blue} />
          </Pressable>
          <Pressable
            style={{position: 'absolute', top: 4, zIndex: 10, left: 14}}
            onPress={onDeleteCard}>
            <AntDesignIcon
              name={count === 1 ? 'close' : 'down'}
              size={12}
              color={count === 1 ? Colors.red : Colors.blue}
            />
          </Pressable>
          <DefaultText>{count}</DefaultText>
        </View>
        <View>
          <DefaultText style={{fontSize: 10}}>Price</DefaultText>
          <DefaultText style={{color: Colors.blue, fontWeight: '900'}}>
            ${card.cardmarket.prices.lowPrice}
          </DefaultText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.spacing8,
    flexDirection: 'row',
  },
  image: {
    backgroundColor: 'blue',
    height: 100,
    width: 80,
    borderRadius: 8,
    marginStart: Spacing.spacing8,
  },
  card: {
    paddingStart: Spacing.spacing8,
    flex: 2,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: Typography.text18,
    fontWeight: '900',
  },
});

export default React.memo(SelectedCard);
