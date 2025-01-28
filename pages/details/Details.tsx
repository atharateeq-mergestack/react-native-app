import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '@/theme';
interface newProducts {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `This is the description for Product ${i + 1}`,
  price: Math.floor(Math.random() * 500) + 1,
  quantity: Math.random() > 0.2 ? Math.floor(Math.random() * 10) + 1 : 0,
  image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
}));

export default function ProductPage() {
  const [products, setProducts] = useState<newProducts[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'less' | 'greater' | ''>('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = () => {
    const newProducts = mockProducts.slice(0, page * PRODUCTS_PER_PAGE);
    setProducts(newProducts);
  };

  const handleSearch = () => {
    const filteredProducts = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setProducts(filteredProducts);
  };

  const handleFilterByPrice = () => {
    if (priceFilter === 'less') {
      setProducts(prev => [...prev].filter(product => product.price < 100));
    } else if (priceFilter === 'greater') {
      setProducts(prev => [...prev].filter(product => product.price > 100));
    }
  };

  const handleSort = () => {
    if (sortOrder === 'asc') {
      setProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    } else if (sortOrder === 'desc') {
      setProducts(prev => [...prev].sort((a, b) => b.price - a.price));
    }
  };

  const renderProduct = ({ item }: { item: newProducts }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productStock}>
        {item.quantity > 0 ? `Stock: ${item.quantity}` : 'Out of Stock'}
      </Text>
    </View>
  );

  const loadMoreProducts = () => {
    if (page * PRODUCTS_PER_PAGE < mockProducts.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filters}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
          <Text style={styles.filterText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setPriceFilter('greater');
            handleFilterByPrice();
          }}>
          <Text style={styles.filterText}>Price {'>'} 100</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setPriceFilter('greater');
            handleFilterByPrice();
          }}>
          <Text style={styles.filterText}>Price {'>'} 100</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSortOrder('asc');
            handleSort();
          }}>
          <Text style={styles.filterText}>Sort: Low to High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSortOrder('desc');
            handleSort();
          }}>
          <Text style={styles.filterText}>Sort: High to Low</Text>
        </TouchableOpacity>
      </View>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    backgroundColor: colors.lightPurple,
    borderRadius: 8,
    marginVertical: 4,
  },
  filterText: {
    color: colors.white,
    textAlign: 'center',
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  productStock: {
    fontSize: 14,
    color: colors.blackGray,
  },
});
