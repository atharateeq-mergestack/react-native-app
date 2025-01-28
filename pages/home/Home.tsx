import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import { categories, products } from '@/utils/data';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.root}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for products..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => router.push({ pathname: 'search', params: { query: search } })}
        />
      </View>

      {/* Top Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Products</Text>
        <FlatList
          data={products.slice(0, 6)}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.productRow}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              {item.quantity === 0 ? (
                <Text style={styles.outOfStock}>Out of Stock</Text>
              ) : (
                <Text style={styles.inStock}>In Stock</Text>
              )}
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => router.push('(main)/(tabs)/home/details')}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 80,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    color: colors.lightPurple,
    marginBottom: 4,
  },
  outOfStock: {
    color: colors.darkPurple,
    fontSize: 12,
  },
  inStock: {
    color: colors.gray,
    fontSize: 12,
  },
  seeMoreButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colors.black,
  },
  seeMoreText: {
    color: colors.gray,
    fontSize: 14,
  },
});
