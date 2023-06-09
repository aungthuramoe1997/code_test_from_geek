import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Card from '../../components/card/Card';
import ScreenContainer from '../../components/container/ScreenContainer';
import Loading from '../../components/loading/Loading';
import {DefaultText} from '../../components/text';
import Toolbar from '../../components/toolbar/Toolbar';
import {Colors, Spacing, Typography} from '../../styles';
import Modal from 'react-native-modal';
import SelectedCard from '../../components/card/SelectedCard';
import {API} from '../../api';
import {AntDesignIcon} from '../../components/icon/Icon';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  const [cards, setCards] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    getCards();
  }, []);
  const getCards = useCallback(() => {
    setIsLoading(true);
    API.getCards(pagination.page, pagination.limit)
      .then(res => {
        setCards(prev => [...prev, ...res.data.data]);
        const totalPage = res.data.totalCount / pagination.limit;
        setPagination(prev => ({
          ...prev,
          page: res.data.page,
          totalPage: totalPage,
        }));
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  }, [pagination]);
  const toggleModal = visibility => {
    togglePay(false);
    setModalVisible(visibility);
  };
  const onSelect = card => {
    const hasCard = selectedCards.find(selected => selected.id === card.id);
    if (hasCard) {
      const updatedCard = selectedCards.filter(
        selected => selected.id !== card.id,
      );
      setSelectedCards(updatedCard);
    } else {
      setSelectedCards(prev => [...prev, card]);
    }
  };
  const onClear = () => {
    setSelectedCards([]);
    toggleModal(false);
  };

  const calculateTotal = useCallback(
    isCard => {
      let totalAmount = 0;
      let totalCard = 0;
      selectedCards.forEach(card => {
        totalCard += Number(card.number);
        totalAmount += Number(card.number) * card.cardmarket.prices.lowPrice;
      });
      return isCard ? totalCard : totalAmount.toFixed(2);
    },
    [selectedCards],
  );

  const togglePay = visibility => {
    setIsPaid(visibility);
  };

  const payNow = () => {
    togglePay(true);
    setSelectedCards([]);
  };

  const addQuantity = (card, shouldAdd = false) => {
    const updatedCard = selectedCards.map(selectedCard => {
      if (selectedCard.id === card.id) {
        return {
          ...selectedCard,
          number: shouldAdd
            ? `${Number(selectedCard.number) + 1}`
            : `${Number(selectedCard.number) - 1}`,
        };
      } else {
        return selectedCard;
      }
    });
    calculateTotal();
    setSelectedCards(updatedCard);
  };

  const onDeleteCard = card => {
    const updatedCard = selectedCards.filter(
      selected => selected.id !== card.id,
    );
    setSelectedCards(updatedCard);
  };

  const renderItem = ({item, index}) => {
    const hasSelected = selectedCards.some(
      selectedCard => selectedCard.id === item.id,
    );
    return <Card card={item} onSelect={onSelect} isSelected={hasSelected} />;
  };
  const renderFooter = () => {
    return (
      isLoading && (
        <View
          style={{
            marginTop: Spacing.spacing8,
            marginBottom: Spacing.spacing8,
          }}>
          <Loading />
        </View>
      )
    );
  };
  const handleLoadMore = () => {
    if (isLoading) {
      return;
    }

    if (pagination.page <= pagination.totalPage) {
      console.log('loard more');
      getCards();
    }
    setPagination(prev => ({...prev, page: prev.page + 1}));
  };
  if (isLoading) {
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Loading />
    </View>;
  }
  return (
    <ScreenContainer>
      {/* Toolbar */}
      <Toolbar />
      {/* Card List */}
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 64}}
          renderItem={renderItem}
          data={cards}
          keyExtractor={(item, index) => index}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={handleLoadMore}
        />
      </View>
      {/* View Card Button */}
      <Pressable style={styles.viewCardBtn} onPress={() => toggleModal(true)}>
        {selectedCards.length !== 0 && (
          <View style={styles.badge}>
            <DefaultText style={{fontSize: 12, color: Colors.white}}>
              {selectedCards.length}
            </DefaultText>
          </View>
        )}
        <AntDesignIcon name={'shoppingcart'} color={Colors.white} size={18} />
        <DefaultText
          style={{
            color: Colors.white,
            paddingStart: Spacing.spacing4,
            fontSize: Typography.text12,
          }}>
          View cart
        </DefaultText>
      </Pressable>
      {/* Selectd Card Modal */}
      <Modal isVisible={isModalVisible} deviceWidth={SCREEN_WIDTH}>
        {isPaid ? (
          <View
            style={{
              height: '30%',
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}>
            <AntDesignIcon name="checkcircle" color="green" size={80} />
            <DefaultText style={{marginTop: Spacing.spacing8}}>
              Payment Success!
            </DefaultText>
            <Pressable style={styles.close} onPress={() => toggleModal(false)}>
              <DefaultText style={{color: Colors.white}}>x</DefaultText>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              height: '80%',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 16,
            }}>
            <ScrollView>
              <View style={{flex: 1}}>
                {selectedCards.map((card, index) => {
                  return (
                    <SelectedCard
                      cards={selectedCards}
                      key={index}
                      card={card}
                      addQuantity={addQuantity}
                      onDelete={onDeleteCard}
                    />
                  );
                })}
              </View>
            </ScrollView>
            <View style={{height: 160, backgroundColor: Colors.white}}>
              <Pressable onPress={onClear}>
                <DefaultText
                  style={{
                    alignSelf: 'center',
                    textDecorationLine: 'underline',
                  }}>
                  Clear all
                </DefaultText>
              </Pressable>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: Spacing.spacing10,
                }}>
                <DefaultText
                  style={{
                    width: 100,
                    fontSize: 16,
                    textAlign: 'right',
                    fontWeight: '700',
                  }}>
                  Total cards
                </DefaultText>
                <DefaultText
                  style={{
                    marginStart: 8,
                    textAlign: 'right',
                    width: 100,
                    color: Colors.close,
                    fontWeight: '700',
                  }}>
                  {calculateTotal(true)}
                </DefaultText>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: Spacing.spacing10,
                }}>
                <DefaultText
                  style={{
                    width: 100,
                    fontSize: 18,
                    textAlign: 'right',
                    color: Colors.black,
                    fontWeight: '900',
                  }}>
                  Total Price
                </DefaultText>
                <DefaultText
                  style={{
                    marginStart: 8,
                    textAlign: 'right',
                    width: 100,
                    color: Colors.close,
                    fontWeight: '900',
                  }}>
                  ${calculateTotal(false)}
                </DefaultText>
              </View>
              <Pressable style={styles.payNow} onPress={payNow}>
                <DefaultText style={{color: Colors.white}}>Pay Now</DefaultText>
              </Pressable>
              <Pressable
                style={styles.close}
                onPress={() => toggleModal(false)}>
                <DefaultText style={{color: Colors.white}}>x</DefaultText>
              </Pressable>
            </View>
          </View>
        )}
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCardBtn: {
    width: 100,
    height: 36,
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  badge: {
    backgroundColor: Colors.red,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    left: -8,
  },
  payNow: {
    backgroundColor: Colors.blue,
    width: 150,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop: Spacing.spacing10,
  },
  close: {
    backgroundColor: Colors.close,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 12,
    bottom: -24,
  },
});

export default React.memo(Home);
