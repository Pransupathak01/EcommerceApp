import React, { useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import productsData from '../assets/products.json';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/reducers/CartSlice';

const Products = () => {
  const [products] = useState(productsData.products);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const lastPageProduct = currentPage * productsPerPage;
  const firstPageProduct = lastPageProduct - productsPerPage;
  const currentProducts = products.slice(firstPageProduct, lastPageProduct);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Toast.show('🎉 Item added to cart!', {
      duration: Toast.durations.SHORT, 
      position: 85, 
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#ffffff', 
      textColor: '#000000',      
    }); 
  };

  if (!products) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={currentProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
            <View style={styles.productInfoContainer}>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.productText}>Rating: {item.rating} / 5</Text>
            </View>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>Price: ${item.price}</Text>
              <Text style={styles.productText}>Discount: {item.discountPercentage}%</Text>
              <Text style={styles.productText}>Stock: {item.stock}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={{ paddingRight: 8 }}>Brand: {item.brand}</Text>
              <Text>Category: {item.category}</Text>
            </View>
            <Button title="Add to Cart" onPress={() => handleAddToCart(item)}/>
          </View>
          </View>
        )}
      />
 
      <View style={styles.paginationContainer}>
        <Button title="Prev" onPress={prevPage} disabled={currentPage === 1} />
        <Text style={styles.pageNumber}>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button title="Next" onPress={nextPage} disabled={currentPage === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
  },
  productContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  productInfoContainer: {
    padding:10
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productDescription: {
    marginBottom: 10,
    fontSize: 17,
  },
  productTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  productText: {
    paddingRight: 8,
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageNumber: {
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default Products;
