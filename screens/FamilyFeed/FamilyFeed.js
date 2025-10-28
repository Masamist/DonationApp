import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { addFamilyPost, subscribeToPosts } from '../../api/crud';

const FamilyFeed = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = subscribeToPosts(setPosts);
  //   return unsubscribe;
  // }, []);

  return (
    <View>
      <Button title="Add Post" onPress={() => addFamilyPost('user1', 'Hello family!', null)} />
      <FlatList data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Text>{item.text} — {item.createdAt?.toDate().toLocaleString()}</Text>
        )}
      />
    </View>
  );
};

export default FamilyFeed;
