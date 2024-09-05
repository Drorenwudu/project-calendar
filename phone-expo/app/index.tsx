import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  function nextDay(){
    if(currentDate.getFullYear() == 2030 && currentDate.getMonth() == 11){
      setCurrentDate(
        new Date(
          currentDate.getFullYear(), 
          currentDate.getMonth(), 
          currentDate.getDate())
        );
    } else {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(), 
          currentDate.getMonth(), 
          currentDate.getDate() + 1)
        );
    }
  }

  function prevDay(){
    if(currentDate.getFullYear() == 2012 && currentDate.getMonth() == 0){
      setCurrentDate(
        new Date(
          currentDate.getFullYear(), 
          currentDate.getMonth(), 
          currentDate.getDate())
        );
    } else {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(), 
          currentDate.getMonth(), 
          currentDate.getDate() - 1)
        );
    }
  }

  useEffect(() => {
    async function getEvent(){
        try {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const response = await axios.get(`http://10.0.2.2:8000/api/`, {
                params: {
                    publish_date: year + "-" + month + "-" + day,
                }
            });
            setEvents(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    getEvent()
}, [currentDate])
  
  return (
    <View style={styles.container}>
      <Text style={{ textAlign:"center", fontSize: 34, fontWeight: 600}}>Calendar</Text>
      <View style={styles.date}>
        <TouchableOpacity style={styles.button} onPress={prevDay}>
          <Text style={{textAlign:"center", fontSize: 24}}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={{ textAlign:"center", fontSize: 34, fontWeight: 600}}>{currentDate.toDateString()}</Text>
        <TouchableOpacity style={styles.button} onPress={nextDay}>
          <Text style={{textAlign:"center", fontSize: 24}}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign:"center", fontSize: 34, fontWeight: 600}}>Evevts</Text>
      <ScrollView>
        {
          events.map((value, index)=> (
            <View style={styles.events} key={index + value["title"]}>
              <View style={styles.time}>
                <Text style={{textAlign:"center", fontSize: 24}}>{value["time"]}</Text>
              </View>
              <ScrollView>
                <View style={styles.event}>
                  <Text style={{flexWrap: 'wrap', textAlign:"left", fontSize: 24, fontWeight: 600}}>{value["title"]}</Text>
                  <Text style={{flexWrap: 'wrap', textAlign:"left", fontSize: 24}}>
                  {value["description"]}
                  </Text>
                </View>
              </ScrollView>
            </View>
          ))
        }
      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
  },
  
  date: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: '#E8CFCF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50, 
  },

  events: {
    flex: 2,
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
  },

  time: {
    padding: 10,
  },

  event: {
    padding: 10,
  },

  text: {
    fontSize: 24,
    lineHeight: 28,
  },
});
